import React from 'react'
import { Link, Route } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import styled from 'styled-components/macro'
import { COLOR } from './GlobalStyle'
import { chat } from '../types/chat'
import { LOCATIONS, toPath } from '../Routes'

type Props = {
  chat: chat
}

const Chat: React.FC<Props> = ({ chat }) => {
  return (
    <Route exact path={toPath(LOCATIONS.chat, chat._id)}>
      {({ match }) =>
        <Wrapper to={`/chat/${chat._id}`} isActive={!!match}>
          <IconWrapper>
            <Icon />
          </IconWrapper>
          <ChatWrapper>
            <Name>{chat.title}</Name>
            <Message>Nice to meet u 😆</Message>
          </ChatWrapper>
        </Wrapper>
      }
    </Route>
  )
}

export default Chat


const Wrapper = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 14px 7px;
  background: ${(props: {isActive: boolean, theme?: any})=> props.isActive? props.theme.bg.tint:props.theme.bg.main};
  border-radius: 5px;
  &:hover {
    background: ${({theme})=>theme.bg.tint};
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
  color: ${({theme})=>theme.font.primary};
`

const Message = styled.span`
  display: block;
  font-weight: 400;
  font-size: 14px;
  color: ${({theme})=>theme.font.secondary};
`
