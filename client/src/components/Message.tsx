import React from 'react'
import styled from 'styled-components/macro'

type Props = {
  message: {
    content: string
    sender: {
      username: string
    }
  }
  incoming: boolean
  continuing: boolean
  endContinuing: boolean
}

const Message: React.FC<Props> = ({ message, incoming, continuing, endContinuing }) => {
  return (
    <Wrapper incoming={incoming} endContinuing={endContinuing}>
      <Content>
        <Name incoming={incoming} continuing={continuing}>
          {message.sender.username}
        </Name>
        <Bubble incoming={incoming}>
          <Text>{message.content}</Text>
        </Bubble>
      </Content>
    </Wrapper>
  )
}

export default Message

const Wrapper = styled.div`
  display: flex;
  justify-content: ${(props: { incoming: boolean; endContinuing: boolean }) =>
    props.incoming ? 'flex-left' : 'flex-end'};
  margin-top: 4px;
  margin-bottom: ${(props: { incoming: boolean; endContinuing: boolean }) => (props.endContinuing ? '8px' : '4px')};
`

const Content = styled.div`
  max-width: calc(100% - 20px);
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

const Name = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR.primary.shaded};
  display: ${(props: { incoming: boolean; continuing: boolean }) =>
    props.incoming && !props.continuing ? 'block' : 'none'};
  margin-bottom: 3px;
`
