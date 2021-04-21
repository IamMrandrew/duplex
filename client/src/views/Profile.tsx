import React, { ReactElement, useState } from 'react'
import styled from 'styled-components/macro'
import { useUserContext } from '../contexts/UserContext'
import { Avatar } from '@material-ui/core'
import EditProfileModal from '../components/EditProfileModal'

type Props = {
  children?: ReactElement
}

const Profile: React.FC<Props> = () => {
  const userContext = useUserContext()
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState(0)

  const editHandler = (select: number) => {
    setShowModal(!showModal)
    setSelected(select)
  }

  return (
    <>
      <EditProfileModal showModal={showModal} setShowModal={setShowModal} selected={selected} />
      <Wrapper>
        <Header>
          <Title>Profile</Title>
        </Header>
        <Content>
          <Username>{`@${userContext.state.username}`}</Username>
          <SectionTitle>Chats</SectionTitle>
          <Card onClick={() => editHandler(0)}>
            <IconWrapper>
              <Icon />
            </IconWrapper>
            <InfoWrapper>
              <Name>{userContext.state && userContext.state.profile ? userContext.state.profile[0].name : ''}</Name>
              <Bio>{userContext.state && userContext.state.profile ? userContext.state.profile[0].bio : ''}</Bio>
            </InfoWrapper>
          </Card>
          <SectionTitle>Conversation</SectionTitle>
          <Card onClick={() => editHandler(1)}>
            <IconWrapper>
              <Icon />
            </IconWrapper>
            <InfoWrapper>
              <Name>{userContext.state && userContext.state.profile ? userContext.state.profile[1].name : ''}</Name>
              <Bio>{userContext.state && userContext.state.profile ? userContext.state.profile[1].bio : ''}</Bio>
            </InfoWrapper>
          </Card>
        </Content>
      </Wrapper>
    </>
  )
}

export default Profile

const Wrapper = styled.div`
  background: ${({ theme }) => theme.bg.tint};
  color: ${({ theme }) => theme.font.primary};
`

const Header = styled.div`
  padding: 32px;
  padding-top: 40px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.bg.tint};
  box-shadow: 0 3px 2px -2px ${({ theme }) => theme.divider};
`
const Content = styled.div`
  padding: 0px 32px;
  padding-top: 48px;
`

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.font.primary};
`
const Username = styled.span`
  display: block;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 30px;
`

const SectionTitle = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
`

const Card = styled.div`
  border-radius: 20px;
  padding: 20px 40px;
  background-color: ${({ theme }) => theme.bg.main};
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  cursor: pointer;
`

const IconWrapper = styled.div`
  margin-right: 20px;

  div {
    width: 80px;
    height: 80px;
  }
`

const Icon = styled(Avatar)``

const InfoWrapper = styled.div`
  padding-top: 10px;
  margin-right: 20px;
  align-self: stretch;
`

const Name = styled.span`
  display: block;
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 10px;
`

const Bio = styled.div`
  font-size: 15px;
  font-weight: 500;
`
