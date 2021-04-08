import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { Route, useHistory } from 'react-router-dom'
import { LOCATIONS, toPath } from '../Routes'
import Option from '../components/Option'
import { useUserContext } from '../contexts/UserContext'
import UserService from '../services/UserService'

type Props = {
  children?: ReactElement
}

const Settings: React.FC<Props> = () => {
  const { logout } = useUserContext()
  const history = useHistory()

  const handleLogout = () => {
    UserService.logout()
      .then((res) => {
        logout()
        history.push(toPath(LOCATIONS.onboarding))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Wrapper>
      <Header>
        <Title>Chats</Title>
      </Header>
      <Route exact path={toPath(LOCATIONS.editProfile)}>
        {({ match }) => <Option path={LOCATIONS.editProfile} isActive={!!match} />}
      </Route>
      {/* <Route exact path={toPath(LOCATIONS.notificationSetting)}>
        {({ match }) => <Option title={`Notification setting`} isActive={!!match} />}
      </Route> */}
      {/* <Route exact path={toPath(LOCATIONS.audioSetting)}>
        {({ match }) => <Option title={`Audio setting`} isActive={!!match} />}
      </Route> */}
      <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
    </Wrapper>
  )
}

export default Settings

const Wrapper = styled.div`
  grid-area: secondary;
  padding: 24px;

  @media (max-width: 767.99px) {
    padding: 12px;
  }
`
const Header = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
`
const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`

const LogoutBtn = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  padding: 14px 0px;
`
