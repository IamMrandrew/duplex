import { Server, Socket } from 'socket.io'

import middleware from './lib/middleware'
import controller from './lib/controller'

import { log } from '../utils'

interface ExtSocket extends Socket {
  userData: any
}

export default (httpServer: any) => {
  const io = new Server(httpServer)

  io.use(middleware.jwtToken)

  io.on('connection', (socket: Socket) => {
    const extSocket = <ExtSocket>socket
    log(extSocket.userData.userId + ' Connected')

    extSocket.on('disconnect', () => {
      log(extSocket.userData.userId + ' Disconnected')
    })

    extSocket.on('join', ({ id }) => {
      extSocket.join(id)
      log(`${extSocket.userData.email} joined chat ${id}`)
    })

    extSocket.on('leave', ({ id }) => {
      extSocket.leave(id)
      log(`${extSocket.userData.email} leaved chat ${id}`)
    })

    extSocket.on('message', async ({ id, content }) => {
      if (content.trim().length > 0) {
        try {
          const message = await controller.saveMessage(extSocket, { id, content })

          io.to(id).emit('newMessage', message)
        } catch (err) {
          console.log(err)
        }
      }
    })
  })

  return io
}
