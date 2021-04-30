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
import { getCookieTheme, getUrlLastSegmant } from './utils'
import Invitation from './views/Invitation'

type Props = {
  children?: ReactElement | Array<ReactElement>
}

export const LOCATIONS = {
  home: 'home',
  onboarding: 'onboarding',
  explore: 'explore',
  settings: {
    root: 'settings',
    profile: 'settings/profile',
    notification: 'settings/notification',
    audio: 'settings/audio',
    appearance: 'settings/appearance',
  },
  invitation: 'invitation/:id',
  login: 'login',
  signup: 'signup',
  chat: 'chat/:id',
  conversation: 'conversation/:id',
}

export const toPath = (location: string, id?: string): string => {
  if (id) return '/' + location.replace(':id', id)
  return '/' + location
}

const Routes = (props: Props): ReactElement => {
  const { isMobile } = useResponsive()
  const userState = useUserContext()
  const history = useHistory()
  const [loading, setLoading] = useState(true) // pre render loadings of authorized contents, need a loading view
  const theme = useSettingContext().state.theme
  const [showNav, setShowNav] = useState(false)

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
        if (currentPage !== LOCATIONS.onboarding && currentPage !== LOCATIONS.login)
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
          <Route exact path={toPath(LOCATIONS.signup)}>
            <Login />
          </Route>
          <ChatProvider>
            <SocketProvider>
              <App showNav={showNav} setShowNav={setShowNav}>
                <>
                  {!isMobile() ? (
                    <>
                      <Route exact path={['/', toPath(LOCATIONS.home)]}>
                        <Chats setShowNav={setShowNav} showNav={showNav} />
                        <ChatArea />
                      </Route>
                      <Route path={[toPath(LOCATIONS.chat), toPath(LOCATIONS.conversation), '/chat', '/conversation']}>
                        <Chats setShowNav={setShowNav} showNav={showNav} />
                        <ChatArea />
                      </Route>
                      <Route exact path={[toPath(LOCATIONS.settings.profile), '/settings']}>
                        <Settings setShowNav={setShowNav} showNav={showNav} />
                        <Profile />
                      </Route>
                      <Route path={toPath(LOCATIONS.settings.appearance)}>
                        <Settings setShowNav={setShowNav} showNav={showNav} />
                        <Appearance />
                      </Route>
                      <Route path={toPath(LOCATIONS.invitation)}>
                        <Invitation />
                      </Route>
                    </>
                  ) : (
                    <>
                      <Route exact path={['/', toPath(LOCATIONS.home), '/chat', '/conversation']}>
                        <Chats setShowNav={setShowNav} showNav={showNav} />
                      </Route>
                      <Route path={[toPath(LOCATIONS.chat), toPath(LOCATIONS.conversation)]}>
                        <ChatArea />
                      </Route>
                      <Route exact path={toPath(LOCATIONS.settings.root)}>
                        <Settings setShowNav={setShowNav} showNav={showNav} />
                      </Route>
                      <Route path={toPath(LOCATIONS.settings.profile)}>
                        <Profile />
                      </Route>
                      <Route path={toPath(LOCATIONS.settings.appearance)}>
                        <Appearance />
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

type AppProps = {
  children?: ReactElement | Array<ReactElement>
  showNav: boolean
  setShowNav: any
}

const App = (props: AppProps): ReactElement => {
  const { children, showNav, setShowNav } = props
  const { socket, connectSocket } = useSocketContext()
  const { setState } = useChatContext()
  const { loggedIn } = useUserContext()
  const updateSetting = useSettingContext().updateState
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ChatService.getChats().then((res) => {
      setLoading(false)
      setState(res.data)
    })
    const theme = getCookieTheme()
    if (theme) {
      updateSetting({ theme: theme })
    }

    socket?.on('update messages', () => {
      ChatService.getChats().then((res) => {
        setState(res.data)
      })
    })
  }, [window.location.href])

  useEffect(() => {
    if (loggedIn()) {
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
      {loading ? (
        <Loading />
      ) : (
        <AppLayout>
          <NavBar showNav={showNav} setShowNav={setShowNav} />
          {children}
        </AppLayout>
      )}
    </>
  )
}

export default Routes
