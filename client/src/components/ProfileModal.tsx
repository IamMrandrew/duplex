import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Overlay from './Overlay'
import { MEDIA_BREAK } from './Layout'
import Avatar from '@material-ui/core/Avatar'
import ChatServices from '../services/ChatService'
import { useChatContext } from '../contexts/ChatContext'
import { useHistory } from 'react-router'

type Props = {
  showModal: boolean
  setShowModal: any
  mode: string
  user: any
}

const ProfileModal: React.FC<Props> = ({ showModal, setShowModal, mode, user }) => {
  const ChatContext = useChatContext()
  const history = useHistory()

  const directMessageHandler = () => {
    const availableChat = ChatContext.state.find(
      (chat: any) =>
        chat.users.find((chatUser: any) => chatUser._id === user._id) && chat.mode === mode && chat.type === 'Direct',
    )
    setShowModal(!showModal)
    if (!availableChat) {
      const data =
        mode === 'Conversation'
          ? { type: 'Direct', mode: 'Conversation', username: user.username }
          : { type: 'Direct', mode: 'Chat', username: user.username }

      ChatServices.createChat(data)
        .then((res) => {
          ChatContext.updateState([res.data])
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      history.push(`/${mode.toLowerCase()}/${availableChat._id}`)
    }
  }

  return (
    <>
      <Overlay showModal={showModal} setShowModal={setShowModal} />
      <Wrapper showModal={showModal}>
        <Card showModal={showModal}>
          <Title>@{user.username}</Title>
          <ProfileCard onClick={() => {}}>
            <IconWrapper>
              <Icon
                src={
                  user && user.profile
                    ? mode === 'Conversation'
                      ? user.profile[1].picture
                      : user.profile[0].picture
                    : ''
                }
              />
            </IconWrapper>
            <InfoWrapper>
              <Name>
                {user && user.profile ? (mode === 'Conversation' ? user.profile[1].name : user.profile[0].name) : ''}
              </Name>
              <Bio>
                {user && user.profile ? (mode === 'Conversation' ? user.profile[1].bio : user.profile[0].bio) : ''}
              </Bio>
            </InfoWrapper>
          </ProfileCard>
          <Button onClick={directMessageHandler}>Direct Message</Button>
        </Card>
      </Wrapper>
    </>
  )
}

export default ProfileModal

const Wrapper = styled.div`
  position: absolute;
  bottom: 50%;
  left: 50%;
  z-index: 1000;
  width: 100%;
  transform: translate(-50%, 50%);
  padding: 20px;
  opacity: ${(props: { showModal: boolean }) => (props.showModal ? '100%' : '0%')};
  pointer-events: none;
  transition: all 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
`

const Card = styled.div`
  max-width: 370px;
  background-color: ${({ theme }) => theme.bg.tint};
  border-radius: 12px;
  padding: 40px 30px;
  margin-left: auto;
  margin-right: auto;
  pointer-events: ${(props: { showModal: boolean }) => (props.showModal ? 'all' : 'none')};

  @media (min-width: ${MEDIA_BREAK}) {
    min-width: 450px;
  }
`

const Title = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.font.primary};
`

const Button = styled.button`
  display: block;
  padding: 12px 15px;
  background-color: ${(props: { theme: any }) => props.theme.primary.main};
  border: none;
  outline: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
  margin-left: auto;
  margin-right: left;
  color: white;
  cursor: pointer;
  transition: 0.2s;
  width: 100%;
`

const ProfileCard = styled.div`
  border-radius: 20px;
  padding: 20px 16px;
  background-color: ${({ theme }) => theme.bg.main};
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const IconWrapper = styled.div`
  margin-right: 20px;

  div {
    width: 70px;
    height: 70px;
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
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.font.primary};
`

const Bio = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.font.primary};
`
