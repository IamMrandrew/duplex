import React, { useState, createContext, useContext, ReactElement } from 'react'

type Obj = Record<string, any>

type ContextType = {
  state: Obj
  updateState: (newState: Obj) => void
}

type Props = {
  children: ReactElement
}

export const ChatContext = createContext<ContextType>({
  state: {},
  updateState: () => {},
})

const ChatProvider = ({ children }: Props): ReactElement => {
  const [state, setState] = useState({})

  // remain properties that are not passed from newState
  // only change properties that are passed from newState
  const updateState = (newState: Obj): void => {
    setState((prevState) => ({ ...prevState, ...newState }))
  }

  return (
    <ChatContext.Provider
      value={{
        state,
        updateState,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = (): ContextType => useContext(ChatContext)

export default ChatProvider
