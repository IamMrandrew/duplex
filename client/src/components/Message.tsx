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
  type: string
}

const Message: React.FC<Props> = ({ message, incoming, continuing, endContinuing, type }) => {
  return (
    <Wrapper system={!message.sender} incoming={incoming} endContinuing={endContinuing}>
      {!message.sender && <Text system={!message.sender}>{message.content}</Text>}
      {message.sender && (
        <Content>
          <Name incoming={incoming} continuing={continuing} type={type}>
            {message.sender.username}
          </Name>
          <Bubble incoming={incoming}>
            <Text system={!message.sender}>{message.content}</Text>
          </Bubble>
        </Content>
      )}
    </Wrapper>
  )
}

export default Message

const Wrapper = styled.div`
  display: flex;
  justify-content: ${(props: { system: boolean; incoming: boolean; endContinuing: boolean }) =>
    props.incoming ? 'flex-left' : props.system ? 'center' : 'flex-end'};
  margin-top: ${(props: { system: boolean; incoming: boolean; endContinuing: boolean }) =>
    props.system ? '16px' : '4px'};
  margin-bottom: ${(props: { incoming: boolean; endContinuing: boolean }) => (props.endContinuing ? '8px' : '4px')};
`

const Content = styled.div`
  max-width: calc(100% - 20px);
`

const Bubble = styled.div`
  padding: 12px 20px;
  background-color: ${(props: { incoming: boolean; theme?: any }) =>
    props.incoming ? props.theme.message.incoming : props.theme.message.sender};
  color: ${(props: { incoming: boolean; theme?: any }) =>
    props.incoming ? props.theme.font.contrast : props.theme.font.primary};
  border-radius: 18px;
`

const Text = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${(props: { system: boolean; theme: any }) => (props.system ? props.theme.font.secondary : 'inherit')};
`

const Name = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${(props: { incoming: boolean; continuing: boolean; type: string; theme?: any }) => props.theme.font.primary};
  display: ${(props: { incoming: boolean; continuing: boolean; type: string }) =>
    props.incoming && !props.continuing && props.type === 'Spaces' ? 'block' : 'none'};
  margin-bottom: 3px;
`
