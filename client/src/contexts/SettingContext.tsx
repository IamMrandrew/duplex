import React, { useState, createContext, useContext, ReactElement } from 'react'

type Obj = Record<string, any>

type StateType = {
    theme: 'dark' | 'light'
}

type ContextType = {
  state: StateType
  updateState: (newState: Obj) => void
}

type Props = {
  children: ReactElement
}

const initials = {
    state: {
        theme: 'light'
    } as StateType,
    updateState: (newState: Obj) => {},
}

export const SettingContext = createContext<ContextType>(initials)

const SettingProvider = ({ children }: Props): ReactElement => {
  const [state, setState] = useState<StateType>(initials.state)

  // remain properties that are not passed from newState
  // only change properties that are passed from newState
  const updateState = (newState: Obj): void => {
    setState((prevState) => ({ ...prevState, ...newState }))
  }

  return (
    <SettingContext.Provider
      value={{
        state,
        updateState,
      }}
    >
      {children}
    </SettingContext.Provider>
  )
}

export const useSettingContext = (): ContextType => useContext(SettingContext)

export default SettingProvider
