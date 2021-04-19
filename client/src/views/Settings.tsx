import React, { ReactElement } from 'react'
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
        <Title>Settings</Title>
      </Header>
      <ContentSection>
        <Route exact path={toPath(LOCATIONS.settings.profile)}>
          {({ match }) => <Option path={LOCATIONS.settings.profile} isActive={!!match} />}
        </Route>
        {/* <Route exact path={toPath(LOCATIONS.notificationSetting)}>
          {({ match }) => <Option title={`Notification setting`} isActive={!!match} />}
        </Route> */}
        {/* <Route exact path={toPath(LOCATIONS.audioSetting)}>
          {({ match }) => <Option title={`Audio setting`} isActive={!!match} />}
        </Route> */}
        <Route exact path={toPath(LOCATIONS.settings.appearance)}>
          {({ match }) => <Option path={LOCATIONS.settings.appearance} isActive={!!match} />}
        </Route>
        <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
      </ContentSection>
    </Wrapper>
  )
}

export default Settings

const Wrapper = styled.div`
  grid-area: secondary;
  background: ${({theme})=>theme.bg.main};
  @media (max-width: 767.99px) {
    padding: 12px;
  }
`
const Header = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${({theme})=>theme.bg.main};
  box-shadow: 0 3px 2px -2px gray;
  min-height: 60px;
  width: 100%;
`
const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  color: ${({theme}) => theme.font.primary}
`
const ContentSection = styled.div`
  padding: 12px 24px 0 24px;
`

const LogoutBtn = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 18px;
  text-align: center;
  padding: 14px 7px;
  transition: 0s;
  margin: 5px 0 5px 0;
  border-radius: 5px;
  color: ${({theme}) => theme.error.main};
  &:hover{
    background: ${({theme}) => theme.error.tint};
  }
`
