import React, { useState, createContext, useContext, ReactElement } from 'react'

type Obj = Record<string, any>

type ContextType = {
  state: Obj
  updateState: (newState: Obj, connectSocket?: ()=>void) => void
  loggedIn: () => boolean
  logout: () => void
}

type Props = {
  children: ReactElement
}

export const UserContext = createContext<ContextType>({
  state: {},
  updateState: () => {},
  loggedIn: () => false,
  logout: () => {},
})

const UserProvider = ({ children }: Props): ReactElement => {
  const [state, setState] = useState({})

  // remain properties that are not passed from newState
  // only change properties that are passed from newState
  const updateState = (newState: Obj, connectSocket?: ()=>void): void => {
    setState((prevState) => ({ ...prevState, ...newState }))
    if(Object.keys(newState).length > 0 && connectSocket) {
      console.log(connectSocket)
      connectSocket()
    }
  }

  const loggedIn = (): boolean => {
    return Object.keys(state).length > 0
  }

  const logout = (): void => {
    setState({})
  }

  return (
    <UserContext.Provider
      value={{
        state,
        updateState,
        loggedIn,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): ContextType => useContext(UserContext)

export default UserProvider
