import { Server, Socket } from 'socket.io'

import middleware from './lib/middleware'
import controller from './lib/controller'

import { log } from '../utils'

const rooms: any = {} // room id as key, user array as value
const socketToRoom: any = {} // socket as key , room id as value

let users: any = [] // array of online users {id, name, roomId}

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
      const roomID = socketToRoom[extSocket.id]
      log(`${extSocket.id} left the room ${roomID}`)
      let room = rooms[roomID]
      if (room) {
        room = room.filter((id: any) => id !== extSocket.id)
        rooms[roomID] = room
      }
      extSocket.broadcast.emit('user left', extSocket.id)
    })

    extSocket.on('join', async ({ id }) => {
      extSocket.join(id)
      const userInfo = await controller.getUserInfo(extSocket)
      if (!users.find((user: any) => user.id === extSocket.userData.userId))
        users.push({
          id: extSocket.userData.userId,
          name: [userInfo.profile[0].name, userInfo.profile[1].name],
          roomId: id,
        })
      io.to(id).emit(
        'newUsers',
        users.filter((user: any) => user.roomId === id),
      )
      log(`${extSocket.userData.email} joined chat ${id}`)
    })

    extSocket.on('leave', ({ id }) => {
      extSocket.leave(id)
      users = users.filter((user: any) => user.id !== extSocket.userData.userId)
      io.to(id).emit(
        'newUsers',
        users.filter((user: any) => user.roomId === id),
      )
      log(`${extSocket.userData.email} leaved chat ${id}`)
    })

    extSocket.on('message', async ({ id, content }) => {
      if (content.trim().length > 0) {
        try {
          const message = await controller.saveMessage(extSocket, { id, content })

          io.emit('newMessage', { id, message })
        } catch (err) {
          console.log(err)
        }
      }
    })

    // below are video call event handlers, id is the chat id, treated as a room id
    extSocket.on('join room', (roomID) => {
      log(`${extSocket.id} joining room ${roomID}`)
      if (rooms[roomID]) {
        const length = rooms[roomID].length
        if (length === 4) {
          extSocket.emit('room full')
          return
        }
        rooms[roomID].push(extSocket.id)
      } else {
        rooms[roomID] = [extSocket.id]
      }
      socketToRoom[extSocket.id] = roomID
      const usersInThisRoom = rooms[roomID].filter((id: any) => id !== extSocket.id)
      console.log(rooms)
      console.log(usersInThisRoom)
      extSocket.emit('all users', usersInThisRoom)
    })

    extSocket.on('sending signal', (payload) => {
      io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID })
    })

    extSocket.on('returning signal', (payload) => {
      io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: extSocket.id })
    })

    extSocket.on('leave room', () => {
      const roomID = socketToRoom[extSocket.id]
      log(`${extSocket.id} left the room ${roomID}`)
      let room = rooms[roomID]
      if (room) {
        room = room.filter((id: any) => id !== extSocket.id)
        rooms[roomID] = room
      }
      console.log(rooms)
      extSocket.broadcast.emit('user left', extSocket.id)
    })

    extSocket.on('readMessage', async ({ id }) => {
      try {
        const read = await controller.readMessage(extSocket, { id })
        const userId = extSocket.userData.userId
        if (read) {
          io.emit('finishedRead', { id, userId })
        }
      } catch (err) {
        console.log(err)
      }
    })

    extSocket.on('joined spaces', async () => {
      io.emit('update messages')
    })

    extSocket.on('created chat', async () => {
      io.emit('update messages')
    })
  })
  return io
}
