import React from 'react'
import styled from 'styled-components/macro'
import { COLOR } from './GlobalStyle'

type Props = {}

const Message: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Bubble>
        <Text>Hello :)</Text>
      </Bubble>
    </Wrapper>
  )
}

export default Message

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
  margin-bottom: 4px;
`

const Bubble = styled.div`
  padding: 12px 20px;
  background-color: white;
  color: ${COLOR.mono.main};
  border-radius: 18px;
`

const Text = styled.span`
  font-size: 16px;
  font-weight: 500;
`
