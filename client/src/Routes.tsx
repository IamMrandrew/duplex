import React, { ReactElement, useState, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { COLOR, GlobalStyle, ResetStyle } from './components/GlobalStyle'
import { AppLayout } from './components/Layout'
import NavBar from './components/NavBar'
import Chats from './views/Chats'
import ChatArea from './views/ChatArea'
import Onboarding from './views/Onboarding'
import Login from './views/Login'
import { useResponsive } from './hooks/useResponsive'

import ChatService from './services/ChatService'
import SocketProvider, { useSocketContext } from './contexts/SocketContext'
import UserService from './services/UserService'
import { useUserContext } from './contexts/UserContext'
import Settings from './views/Settings'
import ChatProvider, { useChatContext } from './contexts/ChatContext'
import Loading from './views/Loading'
import Appearance from './views/Appearance'
import { ThemeProvider } from 'styled-components'
import { useSettingContext } from './contexts/SettingContext'
import Profile from './views/Profile'
import { getUrlLastSegmant } from './utils'

type Props = {
  children?: ReactElement | Array<ReactElement>
}

export const LOCATIONS = {
  home: 'home',
  onboarding: 'onboarding',
  explore: 'explore',
  settings: {
    profile: 'settings/profile',
    notification: 'settings/notification',
    audio: 'settings/audio',
    appearance: 'settings/appearance',
  },
  login: 'login',
  chat: 'chat/:id',
}

export const toPath = (location: string, id?: string): string => {
  if (id) return '/' + location.replace(':id', id)
  return '/' + location
}

const Routes = (props: Props): ReactElement => {
  const { children, ...rest } = props
  const { isMobile } = useResponsive()
  const userState = useUserContext()
  const history = useHistory()
  const [loading, setLoading] = useState(true) // pre render loadings of authorized contents, need a loading view
  const theme = useSettingContext().state.theme

  // OnMount actions for all pages
  useEffect(() => {
    UserService.getUser()
      .then((res) => {
        setLoading(false)
        userState.updateState(res.data)
      })
      .catch(() => {
        setLoading(false)
        const currentPage = getUrlLastSegmant()
        if(currentPage !== LOCATIONS.onboarding && currentPage !== LOCATIONS.login)
          history.push(toPath(LOCATIONS.onboarding))
      })
  }, [])

  return (
    <>
    <ThemeProvider theme={theme === 'light' ? COLOR.light : COLOR.dark}>
      <ResetStyle />
      <GlobalStyle />
      <Switch>
        <Route exact path={toPath(LOCATIONS.onboarding)}>
          <Onboarding />
        </Route>
        <Route exact path={toPath(LOCATIONS.login)}>
          <Login />
        </Route>
        <ChatProvider>
          <SocketProvider>
            <App>
              <>
                {!isMobile() ? (
                  <>
                    <Route exact path={['/', toPath(LOCATIONS.home)]}>
                      <Chats />
                      <ChatArea />
                    </Route>
                    <Route path={toPath(LOCATIONS.chat)}>
                      <Chats />
                      <ChatArea />
                    </Route>
                    <Route path={toPath(LOCATIONS.settings.profile)}>
                      <Settings />
                      <Profile />
                    </Route>
                    <Route path={toPath(LOCATIONS.settings.appearance)}>
                      <Settings />
                      <Appearance />
                    </Route>
                  </>
                ) : (
                  <>
                    <Route exact path={['/', toPath(LOCATIONS.home)]}>
                      <Chats />
                    </Route>
                    <Route path={toPath(LOCATIONS.chat)}>
                      <ChatArea />
                    </Route>
                    <Route path={toPath(LOCATIONS.settings.profile)}>
                      <Settings />
                    </Route>
                  </>
                )}
              </>
            </App>
          </SocketProvider>
        </ChatProvider>
      </Switch>
    </ThemeProvider>
    </>
  )
}

const App = (props: Props): ReactElement => {
  const { children } = props
  const { socket, connectSocket }= useSocketContext()
  const { updateState } = useChatContext()
  const { loggedIn } = useUserContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ChatService.getChats().then((res) => {
      setLoading(false)
      updateState(res.data)
    })
  }, [])

  useEffect(()=>{
    if(loggedIn()) {
      connectSocket()
      socket?.on('connect', () => {
        console.log('Socket connect successfully ')
      })
    }
    
    return () => {
      socket?.close()
      console.log('Socket disconnected')
    }
  }, [loggedIn()])

  return (
    <>
    {loading ? <Loading />:
      <AppLayout>
        <NavBar />
        {children}
      </AppLayout>
    }
    </>
  )
}

export default Routes
