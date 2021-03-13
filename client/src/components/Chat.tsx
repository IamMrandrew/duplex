import React from 'react'
import { Avatar } from '@material-ui/core'
import styled from 'styled-components/macro'

type Props = {}

const Chat: React.FC<Props> = () => {
  return (
    <Wrapper>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <ChatWrapper>
        <Name>Ellis </Name>
        <Message>Nice to meet u 😆</Message>
      </ChatWrapper>
    </Wrapper>
  )
}

export default Chat

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 20px 0px;
`

const IconWrapper = styled(Avatar)`
  margin-right: 20px;
`
const Icon = styled(Avatar)``

const ChatWrapper = styled.div``

const Name = styled.span`
  display: block;
  font-weight: 500;
  font-size: 20px;
`

const Message = styled.span`
  display: block;
  font-weight: 400;
  font-size: 16px;
`
