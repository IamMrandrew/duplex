import React, { useState, createContext, useContext, ReactElement } from 'react'
import io, { Socket } from 'socket.io-client'

type ContextType = {
  socket: Socket | undefined
  connectSocket: () => void
}

type Props = {
  children: ReactElement | ReactElement[]
}

const initials = {
  socket: undefined,
  connectSocket: () => {},
}

export const SocketContext = createContext<ContextType>(initials)

const SocketProvider = ({ children }: Props): ReactElement => {
  const [socket, setSocket] = useState<Socket | undefined>(initials.socket)

  const connectSocket = () => {
    console.log("create io");
    setSocket(io({withCredentials: true}))
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        connectSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = (): ContextType => useContext(SocketContext)

export default SocketProvider
