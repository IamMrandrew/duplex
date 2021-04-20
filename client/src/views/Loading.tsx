import React, { ReactElement } from 'react'
import styled from 'styled-components'
import Progress from '../components/Progress'


const Loading = (): ReactElement => {
  return (
    <Wrapper>
      <Progress />
    </Wrapper>
  )
}

export default Loading

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: ${({theme})=>theme.bg.tint}
`