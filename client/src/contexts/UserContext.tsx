import React, { useState, createContext, useContext, ReactElement } from 'react'

type Obj = Record<string, any>

type ContextType = {
  state: Obj
  updateState: (newState: Obj) => void
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
  const updateState = (newState: Obj): void => {
    setState((prevState) => ({ ...prevState, ...newState }))
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
