import React, { createContext } from 'react'
import io from 'socket.io-client'

interface contextInterface {
  socket: any
}

export const SocketContext = createContext<contextInterface>({
  socket: null,
})

export const socket = io({
  withCredentials: true,
})

// export const SocketContextProvider = (props: any) => {
//   return <SocketContextProvider value={socket}>{props.children}</SocketContextProvider>
// }
