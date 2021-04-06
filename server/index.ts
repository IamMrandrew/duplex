import express, { Request, Response } from 'express'
import Routes from './routes'
import path from 'path'
import UserRoutes from './routes/user'
import ChatRoutes from './routes/chat'
import connectDB from './DB'
import middlewares from './middleware'
import cookie from 'cookie'
require('dotenv').config()

const app: express.Application = express()

app.use(middlewares)

// db connection
connectDB()

// app routes
const routes: Array<Routes> = []
const router = express.Router()

routes.push(new UserRoutes(router))
routes.push(new ChatRoutes(router))

app.use('/api', router)
//

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
  })
} else {
  app.get('/', (req: Request, res: Response) => {
    res.send('Server is running!!')
  })
}

import { Server, Socket } from 'socket.io'
import { createServer } from 'http'
import jwt from 'jsonwebtoken'

import User from './models/user'
import Chat from './models/chat'
import mongoose from 'mongoose'

const httpServer = createServer(app)
const io = new Server(httpServer)

interface ExtSocket extends Socket {
  userData: any
}

io.use((socket: Socket, next) => {
  // Middleware that handle the JWT
  const cookies = cookie.parse(socket.handshake.headers.cookie || '')
  const token = cookies.token

  jwt.verify(token, process.env.JWT_TOKEN || '', async (verifyErr: any, decoded: any) => {
    if (verifyErr?.message == 'jwt expired') return console.error('Token expried' + verifyErr)
    if (verifyErr?.message == 'jwt must be provided') return console.error('Unauthorized' + verifyErr)
    if (decoded) {
      const extSocket = <ExtSocket>socket
      extSocket.userData = decoded
      next()
    }
  })
})

io.on('connection', (socket: Socket) => {
  const extSocket = <ExtSocket>socket
  console.log(extSocket.userData.userId + ' Connected')

  extSocket.on('disconnect', () => {
    console.log(extSocket.userData.userId + ' Disconnected')
  })

  extSocket.on('join', ({ id }) => {
    extSocket.join(id)
    console.log(`${extSocket.userData.email} joined chat ${id}`)
  })

  extSocket.on('leave', ({ id }) => {
    extSocket.leave(id)
    console.log(`${extSocket.userData.email} leaved chat ${id}`)
  })

  extSocket.on('message', async ({ id, content }) => {
    if (content.trim().length > 0) {
      try {
        const user = await User.findById(extSocket.userData.userId)
        const message: any = {
          _id: new mongoose.Types.ObjectId(),
          sender: user,
          content: content,
          createdAt: Date.now(),
        }
        const chat = await Chat.findByIdAndUpdate(id, { $push: { messages: message } }, { new: true })

        io.to(id).emit('newMessage', message)
      } catch (err) {
        console.log(err)
      }
    }
  })
})

httpServer.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT)
})
