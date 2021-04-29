import express, { Request, Response } from 'express'
import { createServer } from 'http'
import Routes from './routes'
import path from 'path'
import UserRoutes from './routes/user'
import ChatRoutes from './routes/chat'
import connectDB from './DB'
import middlewares from './middleware'
import socket from './socket'
import { AWSRoutes } from './routes/aws'

require('dotenv').config()

const app: express.Application = express()
const httpServer = createServer(app)

// socket.io
socket(httpServer)

app.use(middlewares)

// db connection
connectDB()

// app routes
const routes: Array<Routes> = []
const router = express.Router()

routes.push(new UserRoutes(router))
routes.push(new ChatRoutes(router))
routes.push(new AWSRoutes(router))

app.use('/api', router)

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

httpServer.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT)
})
