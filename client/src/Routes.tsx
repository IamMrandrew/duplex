import React, { useState, useEffect, ReactElement } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
// import { GlobalStyle, ResetStyle } from '@components/GlobalStyle'
import { GlobalStyle, ResetStyle } from './components/GlobalStyle'
import { AppLayout } from './components/Layout'
import NavBar from './components/NavBar'
import Chats from './views/Chats'
import ChatArea from './views/ChatArea'

type Props = {
  children?: ReactElement
}

export const LOCATIONS = {
  home: 'home',
  onboarding: 'onboarding',
  profile: 'profile',
  explore: 'explore',
  settings: 'settings',
}

export const toPath = (location: string): string => {
  return '/' + location
}

const Routes = (props: Props): ReactElement => {
  const { children, ...rest } = props

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })

  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <AppLayout>
        <NavBar />
        <Switch>
          {dimensions.width > 768 && (
            <>
              <Route exact path={['/', toPath(LOCATIONS.home)]}>
                <Chats />
                <ChatArea />
              </Route>
              <Route path="/chat">
                <Chats />
                <ChatArea />
              </Route>
            </>
          )}
          {dimensions.width <= 768 && (
            <>
              <Route exact path="/">
                <Chats />
              </Route>
              <Route path="/chat">
                <ChatArea />
              </Route>
            </>
          )}
        </Switch>
      </AppLayout>
    </>
  )
}

export default Routes
