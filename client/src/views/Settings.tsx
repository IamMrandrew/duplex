import React from 'react'
import styled from 'styled-components/macro'
import { Route, useHistory } from 'react-router-dom'
import { LOCATIONS, toPath } from '../Routes'
import Option from '../components/Option'
import { useUserContext } from '../contexts/UserContext'
import UserService from '../services/UserService'
import { MEDIA_BREAK } from '../components/Layout'
import { FaChevronRight } from 'react-icons/fa'
import { useResponsive } from '../hooks/useResponsive'

type Props = {
  setShowNav: any
  showNav: boolean
}

const Settings: React.FC<Props> = ({ showNav, setShowNav }) => {
  const { logout } = useUserContext()
  const history = useHistory()
  const { isMobile } = useResponsive()

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
    <Wrapper showNav={showNav}>
      <Header>
        {isMobile() && (
          <BackButton showNav={showNav} onClick={() => setShowNav((prev: any) => !prev)}>
            <FaChevronRight />
          </BackButton>
        )}
        <Title>Settings</Title>
      </Header>
      <ContentSection>
        <Section>
          <Route exact path={toPath(LOCATIONS.settings.profile)}>
            {({ match }) => <Option path={LOCATIONS.settings.profile} $isActive={!!match} />}
          </Route>
          {/* <Route exact path={toPath(LOCATIONS.notificationSetting)}>
          {({ match }) => <Option title={`Notification setting`} $isActive={!!match} />}
        </Route> */}
          {/* <Route exact path={toPath(LOCATIONS.audioSetting)}>
          {({ match }) => <Option title={`Audio setting`} $isActive={!!match} />}
        </Route> */}
          <Route exact path={toPath(LOCATIONS.settings.appearance)}>
            {({ match }) => <Option path={LOCATIONS.settings.appearance} $isActive={!!match} />}
          </Route>
        </Section>
        <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
      </ContentSection>
    </Wrapper>
  )
}

export default Settings

const Wrapper = styled.div`
  grid-area: secondary;
  background: ${({ theme }) => theme.bg.tint};
  box-shadow: 3px 0px 2px -2px ${({ theme }) => theme.divider};
  z-index: 50;
  transition: 0.1s;
  @media (max-width: ${MEDIA_BREAK}) {
    padding: 12px;
    transform: ${(props: { showNav: boolean }) => (props.showNav ? 'translateX(85px)' : 'translateX(0)')};
    transition: all 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
    height: 100vh;
  }
`
const Header = styled.div`
  padding: 24px;
  padding-top: 50px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.bg.tint};
  min-height: 60px;
  width: 100%;
  transition: 0.1s;
`
const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  min-height: 30px;
  line-height: 30px;
  color: ${({ theme }) => theme.font.primary};
  transition: 0.1s;
`
const ContentSection = styled.div`
  padding: 12px 24px 0 24px;
  transition: 0.1s;
`

const Section = styled.div`
  margin-top: 20px;
  background-color: ${({ theme }) => theme.bg.main};
  border-radius: 12px;
  overflow: hidden;
  transition: 0.1s;
`

const LogoutBtn = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 18px;
  text-align: center;
  padding: 14px 16px;
  transition: 0s;
  margin: 5px 0 5px 0;
  border-radius: 5px;
  color: ${({ theme }) => theme.error.main};
  transition: 0.1s;
  &:hover {
    background: ${({ theme }) => theme.error.tint};
  }
`

const BackButton = styled.button`
  background: none;
  border: none;
  outline: none;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;

  > svg {
    color: ${({ theme }) => theme.font.primary};
    font-size: 18px;
    transform: ${(props: { showNav: boolean }) => (props.showNav ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: all 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
  }
`
