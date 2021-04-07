import React from 'react'
import styled from 'styled-components/macro'
import { COLOR } from './GlobalStyle'

type Props = {
  message: {
    content: string
    sender: string
  }
  incoming: boolean
}

const Message: React.FC<Props> = ({ message, incoming }) => {
  return (
    <Wrapper incoming={incoming}>
      <Bubble incoming={incoming}>
        <Text>{message.content}</Text>
      </Bubble>
    </Wrapper>
  )
}

export default Message

const Wrapper = styled.div`
  display: flex;
  justify-content: ${(props: { incoming: boolean }) => (props.incoming ? 'flex-left' : 'flex-end')};
  margin-top: 4px;
  margin-bottom: 4px;
`

const Bubble = styled.div`
  padding: 12px 20px;
  background-color: ${(props: { incoming: boolean }) => (props.incoming ? COLOR.primary.main : 'white')};
  color: ${(props: { incoming: boolean }) => (props.incoming ? 'white' : COLOR.mono.main)};
  border-radius: 18px;
`

const Text = styled.span`
  font-size: 16px;
  font-weight: 500;
`
