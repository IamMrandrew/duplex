import React, { useState, createContext, useContext, ReactElement } from 'react'
import { chat } from '../types/chat'

type ContextType = {
  state: Array<chat>
  updateState: (newState: Array<chat>) => void
  updateChatMessage: (id: string, chat: any, message: any) => void
}

type Props = {
  children: ReactElement
}

export const ChatContext = createContext<ContextType>({
  state: [],
  updateState: () => {},
  updateChatMessage: () => {},
})

const ChatProvider = ({ children }: Props): ReactElement => {
  const [state, setState] = useState<Array<chat>>([])

  // remain properties that are not passed from newState
  // only change properties that are passed from newState
  const updateState = (newState: Array<chat>): void => {
    setState((prevState) => [...prevState, ...newState])
  }

  const updateChatMessage = (id: string, chat: any, message: any) => {
    setState(
      state.map((chat) => {
        if (chat._id === id) {
          return { ...chat, messages: [...chat.messages, message] }
        }
        return chat
      }),
    )
  }

  return (
    <ChatContext.Provider
      value={{
        state,
        updateState,
        updateChatMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = (): ContextType => useContext(ChatContext)

export default ChatProvider
