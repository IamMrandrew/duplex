import React, { ReactElement } from 'react'
import styled from 'styled-components/macro'
import { useUserContext } from '../contexts/UserContext'

type Props = {
  children?: ReactElement
}

const Profile: React.FC<Props> = () => {
  const userContext = useUserContext()

  return (
    <Wrapper>
      <Name>{`@${userContext.state.username}`}</Name>
    </Wrapper>
  )
}

export default Profile

const Wrapper = styled.div`
  padding: 50px 40px 80px;
  background: ${({theme})=>theme.bg.tint};
  color: ${({theme})=>theme.font.primary};
`

const Name = styled.span`
  font-size: 18px;
  font-weight: 700;
`