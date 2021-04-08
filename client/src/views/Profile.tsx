import React, { ReactElement, useState, useEffect, useContext } from 'react'
import styled from 'styled-components/macro'
import { COLOR } from '../components/GlobalStyle'
import { useUserContext } from '../contexts/UserContext'
import { Avatar } from '@material-ui/core'

type Props = {
  children?: ReactElement
}

const Profile: React.FC<Props> = () => {
  const userContext = useUserContext()

  return (
    <Wrapper>
      <Header>
        <TitleWrapper>
          <Name>Profile</Name>
        </TitleWrapper>
      </Header>
      <Content>
        <Name>{`@${userContext.state.username}`}</Name>
      </Content>
    </Wrapper>
  )
}

export default Profile

const Wrapper = styled.div`
  background-color: ${COLOR.bg.palegrey};
`

const Header = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${COLOR.bg.light};
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  > :nth-child(1) {
    margin-right: 20px;
  }
`

const Content = styled.div`
  height: calc(100vh - 60px - 100px);
  padding: 8px 32px;

  @media (max-width: 767.99px) {
    padding: 12px;
  }
`

const Name = styled.span`
  font-size: 18px;
  font-weight: 700;
`

const Card = styled.div`
  display: flex;
  flex-direction: row;
`

const Icon = styled(Avatar)``

const Description = styled.div`
  display: flex;
  flex-direction: column;
`
