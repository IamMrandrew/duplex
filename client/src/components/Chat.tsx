import React from 'react'
import { Link, Route } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import styled from 'styled-components/macro'
import { chat } from '../types/chat'
import { LOCATIONS, toPath } from '../Routes'
import { useUserContext } from '../contexts/UserContext'

type Props = {
  chat: chat
}

const Chat: React.FC<Props> = ({ chat }) => {
  const userState = useUserContext()

  const trimmedContent = (): string => {
    if (chat.messages && chat.messages.length && chat.messages[chat.messages.length - 1].content) {
      return chat.messages.length > 0
        ? chat.messages[chat.messages.length - 1].content.length > 32
          ? chat.messages[chat.messages.length - 1].content.substring(0, 32) + '...'
          : chat.messages[chat.messages.length - 1].content.substring(0, 32)
        : ''
    }
    return ''
  }

  const checkIfRead = (): boolean => {
    if (chat.messages.length <= 0) {
      return true
    }

    if (chat.messages.length > 0 && chat.messages[chat.messages.length - 1].readers) {
      return chat.messages[chat.messages.length - 1].readers.find((reader: any) => reader === userState.state._id)
    }

    return false
  }

  const getPicture = (profileIndex: number):string => {
    if(chat.type === 'Spaces')
      return chat.users[0]?.profile[profileIndex].picture
    else
      return chat.users.find((user: any) => user._id !== userState.state._id).profile[profileIndex].picture
  }

  return (
    <Route exact path={toPath(LOCATIONS.chat, chat._id)}>
      {({ match }) => (
        <Wrapper
          to={chat.mode === 'Conversation' ? `/conversation/${chat._id}` : `/chat/${chat._id}`}
          $isActive={!!match}
        >
          <IconWrapper>
            <Icon src={chat.mode === 'Conversation' ? getPicture(1) : getPicture(0)} />
          </IconWrapper>
          <ChatWrapper>
            <Name>
              {chat.type === 'Spaces'
                ? chat.title
                : chat.mode === 'Conversation'
                ? chat.users.find((user: any) => user._id !== userState.state._id).profile[1].name
                : chat.users.find((user: any) => user._id !== userState.state._id).profile[0].name}
            </Name>
            <Message>{trimmedContent()}</Message>
            <Noti read={checkIfRead()}></Noti>
          </ChatWrapper>
        </Wrapper>
      )}
    </Route>
  )
}

export default Chat

const Wrapper = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 14px 16px;
  background: ${(props: { $isActive: boolean; theme?: any }) =>
    props.$isActive ? props.theme.bg.shade : props.theme.bg.main};
  /* border-radius: 5px; */

  &:hover {
    background: ${({ theme }) => theme.bg.shade};
  }
`

const IconWrapper = styled.div`
  margin-right: 20px;
`
const Icon = styled(Avatar)``

const ChatWrapper = styled.div``

const Name = styled.span`
  display: block;
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.font.primary};
`

const Message = styled.span`
  display: block;
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.font.secondary};
`

const Noti = styled.div`
  position: absolute;
  bottom: 24px;
  right: 16px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary.main};
  display: ${(props: { read: boolean; theme: any }) => (props.read ? 'none' : 'block')};
`
