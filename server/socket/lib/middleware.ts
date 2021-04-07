import { Server, Socket } from 'socket.io'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

interface ExtSocket extends Socket {
  userData: any
}

const Middleware = {
  jwtToken: (socket: Socket, next: any) => {
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
  },
}

export default Middleware
