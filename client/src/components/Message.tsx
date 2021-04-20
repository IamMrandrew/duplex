import React from 'react'
import styled from 'styled-components/macro'

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
  background-color: ${(props: { incoming: boolean, theme?: any }) => (props.incoming ? props.theme.message.incoming : props.theme.message.sender)};
  color: ${(props: { incoming: boolean, theme?: any }) => (props.incoming ? props.theme.font.contrast : props.theme.font.primary)};
  border-radius: 18px;
`

const Text = styled.span`
  font-size: 16px;
  font-weight: 400;
`
