import styled, { keyframes } from 'styled-components'
import { COLOR } from './GlobalStyle'
import React from 'react'
import DuplexIcon from './DuplexIcon'
import { useSettingContext } from '../contexts/SettingContext'

const Progress: React.FC = () => {
  const { theme } = useSettingContext().state

  return (
    <Wrapper>
      <CircleOuter></CircleOuter>
      <CircleInner></CircleInner>
      <IconWrapper>
        <DuplexIcon color={theme === 'dark' ? COLOR.dark.primary.shade : COLOR.light.primary.shade} />
      </IconWrapper>
    </Wrapper>
  )
}

export default Progress

const size = 180

const animation = keyframes`
  0% {
    top: ${size * 0.5}px;
    left: ${size * 0.5}px;
    width: 48px;
    height: 48px;
    opacity: 1;
  }

  100% {
    top: 24px;
    left: 24px;
    width: ${size}px;
    height: ${size}px;
    opacity: 0;
  }
`

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: ${size + 48}px;
  height: ${size + 48}px;
`

const CircleOuter = styled.div`
  position: absolute;
  border: 4px solid ${({ theme }) => theme.bg.shade};
  background: ${({ theme }) => theme.bg.shade};
  opacity: 1;
  border-radius: 50%;
  animation: ${animation} 1.2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
`

const CircleInner = styled.div`
  position: absolute;
  border: 4px solid ${({ theme }) => theme.bg.shade};
  background: ${({ theme }) => theme.bg.shade};
  opacity: 1;
  border-radius: 50%;
  animation: ${animation} 1.2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  animation-delay: -0.5s;
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
