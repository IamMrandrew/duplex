import React, { ReactElement, useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
// import { GlobalStyle, ResetStyle } from '@components/GlobalStyle'
import { GlobalStyle, ResetStyle } from './components/GlobalStyle'
import { AppLayout } from './components/Layout'
import NavBar from './components/NavBar'
import Chats from './views/Chats'
import ChatArea from './views/ChatArea'
import Onboarding from './views/Onboarding'
import Login from './views/Login'
import { useResponsive } from './hooks/useResponsive'

import ChatService from './services/ChatService'

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
  chat: 'chat/:id',
}

export const toPath = (location: string): string => {
  return '/' + location
}

const Routes = (props: Props): ReactElement => {
  const { children, ...rest } = props
  const { isMobile } = useResponsive()

  // This state and useEffect can put inside App, But I am not sure how
  const [chats, setChats] = useState([])

  useEffect(() => {
    ChatService.getChats().then((res) => {
      setChats(res.data)
    })
  }, [])

  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <Switch>
        <Route exact path={toPath(LOCATIONS.onboarding)}>
          <Onboarding />
        </Route>
        <Route exact path={toPath(LOCATIONS.login)}>
          <Login />
        </Route>
        <App>
          <>
            {!isMobile() && (
              <>
                <Route exact path={['/', toPath(LOCATIONS.home)]}>
                  <Chats chats={chats} />
                  <ChatArea chats={chats} />
                </Route>
                <Route path={toPath(LOCATIONS.chat)}>
                  <Chats chats={chats} />
                  <ChatArea chats={chats} />
                </Route>
              </>
            )}
            {isMobile() && (
              <>
                <Route exact path={['/', toPath(LOCATIONS.home)]}>
                  <Chats chats={chats} />
                </Route>
                <Route path={toPath(LOCATIONS.chat)}>
                  <ChatArea chats={chats} />
                </Route>
              </>
            )}
          </>
        </App>
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
