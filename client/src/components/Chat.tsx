import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import styled from 'styled-components/macro'
import { COLOR } from './GlobalStyle'
import { chat } from '../types/chat'

type Props = {
  chat: chat
}

const Chat: React.FC<Props> = ({ chat }) => {
  const trimmedContent = (): string => {
    return chat.messages.length > 0
      ? chat.messages[chat.messages.length - 1].content.length > 32
        ? chat.messages[chat.messages.length - 1].content.substring(0, 32) + '...'
        : chat.messages[chat.messages.length - 1].content.substring(0, 32)
      : ''
  }

  return (
    <Wrapper to={`/chat/${chat._id}`}>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <ChatWrapper>
        <Name>{chat.title}</Name>
        <Message>{trimmedContent()}</Message>
      </ChatWrapper>
    </Wrapper>
  )
}

export default Chat

const Wrapper = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;

  padding: 14px 0px;
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
  color: ${COLOR.mono.main};
`

const Message = styled.span`
  display: block;
  font-weight: 400;
  font-size: 14px;
  color: ${COLOR.mono.tinted};
`
