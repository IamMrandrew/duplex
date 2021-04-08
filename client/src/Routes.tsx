import React, { ReactElement, useState, useEffect, useContext } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { GlobalStyle, ResetStyle } from './components/GlobalStyle'
import { AppLayout } from './components/Layout'
import NavBar from './components/NavBar'
import Chats from './views/Chats'
import ChatArea from './views/ChatArea'
import Onboarding from './views/Onboarding'
import Login from './views/Login'
import { useResponsive } from './hooks/useResponsive'

import ChatService from './services/ChatService'
import { SocketContext, socket } from './contexts/SocketContext'
import UserService from './services/UserService'
import { useUserContext } from './contexts/UserContext'
import EditProfile from './views/EditProfile'
import Settings from './views/Settings'
import ChatProvider, { useChatContext } from './contexts/ChatContext'

type Props = {
  children?: ReactElement | Array<ReactElement>
}

export const LOCATIONS = {
  home: 'home',
  onboarding: 'onboarding',
  profile: 'profile',
  editProfile: 'editProfile',
  explore: 'explore',
  settings: 'settings',
  login: 'login',
  chat: 'chat/:id',
}

export const toPath = (location: string): string => '/' + location

const Routes = (props: Props): ReactElement => {
  const { children, ...rest } = props
  const { isMobile } = useResponsive()
  const userState = useUserContext()
  const history = useHistory()
  const [loading, setLoading] = useState(true) // pre render loadings of authorized contents, need a loading view
  // This state and useEffect can put inside App, But I am not sure how
  const [chats, setChats] = useState([])

  // OnMount actions for all pages
  useEffect(() => {
    UserService.getUser()
      .then((res) => {
        setLoading(false)
        userState.updateState(res.data)
      })
      .catch((err) => {
        setLoading(false)
        history.push(toPath(LOCATIONS.onboarding))
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
        <ChatProvider>
          <SocketContext.Provider value={{ socket }}>
            <App>
              <>
                {!isMobile() ? (
                  <>
                    <Route exact path={['/', toPath(LOCATIONS.home)]}>
                      <Chats chats={chats} />
                      <ChatArea chats={chats} setChats={setChats} />
                    </Route>
                    <Route path={toPath(LOCATIONS.chat)}>
                      <Chats chats={chats} />
                      <ChatArea chats={chats} setChats={setChats} />
                    </Route>
                    <Route path={toPath(LOCATIONS.settings)}>
                      <Settings />
                      <EditProfile />
                    </Route>
                  </>
                ) : (
                  <>
                    <Route exact path={['/', toPath(LOCATIONS.home)]}>
                      <Chats chats={chats} />
                    </Route>
                    <Route path={toPath(LOCATIONS.chat)}>
                      <ChatArea chats={chats} setChats={setChats} />
                    </Route>
                    <Route path={toPath(LOCATIONS.settings)}>
                      <Settings />
                    </Route>
                  </>
                )}
              </>
            </App>
          </SocketContext.Provider>
        </ChatProvider>
      </Switch>
    </>
  )
}

const App = (props: Props): ReactElement => {
  const { children } = props
  const { socket } = useContext(SocketContext)
  const { updateState } = useChatContext()

  useEffect(() => {
    ChatService.getChats().then((res) => {
      updateState(res.data)
    })

    socket.on('connect', () => {
      console.log('Socket connect successfully ')
    })

    return () => {
      socket.close()
      console.log('Socket disconnected')
    }
  }, [])

  return (
    <AppLayout>
      <NavBar />
      {children}
    </AppLayout>
  )
}

export default Routes
