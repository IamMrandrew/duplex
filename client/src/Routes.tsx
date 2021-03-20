import React, { ReactElement } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
// import { GlobalStyle, ResetStyle } from '@components/GlobalStyle'
import { GlobalStyle, ResetStyle } from './components/GlobalStyle'
import { AppLayout } from './components/Layout'
import NavBar from './components/NavBar'
import Chats from './views/Chats'
import ChatArea from './views/ChatArea'
import Onboarding from './views/Onboarding'
import Login from './views/Login'

type Props = {
  children?: ReactElement | Array<ReactElement>
}

export const LOCATIONS = {
  home: 'home',
  onboarding: 'onboarding',
  profile: 'profile',
  explore: 'explore',
  settings: 'settings',
  login: 'login',
}

export const toPath = (location: string): string => {
  return '/' + location
}

const Routes = (props: Props): ReactElement => {
  const { children, ...rest } = props
  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <Switch>
        <Route exact path={['/', toPath(LOCATIONS.home)]}>
          <App>
            <Chats />
            <ChatArea />
          </App>
        </Route>
        <Route exact path={toPath(LOCATIONS.onboarding)}>
          <Onboarding />
        </Route>
        <Route exact path={toPath(LOCATIONS.login)}>
          <Login />
        </Route>
      </Switch>
    </>
  )
}

const App = (props: Props): ReactElement => {
  const { children } = props
  return (
    <AppLayout>
      <NavBar />
      {children}
    </AppLayout>
  )
}

export default Routes
