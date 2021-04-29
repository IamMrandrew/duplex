import React, { ReactElement, useState } from 'react'
import styled from 'styled-components/macro'
import { FaChevronDown } from 'react-icons/fa'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import { MEDIA_BREAK } from '../components/Layout'

type onlineUser = {
  id: string
  name: [string, string]
  roomId?: string
}

type Props = {
  children?: ReactElement
  onlineUsers: [onlineUser]
  mode: string
}

const ChatDrawer: React.FC<Props> = ({ onlineUsers, mode }) => {
  const [show, setShow] = useState(true)

  return (
    <Wrapper show={show}>
      <ToggleButton show={show} onClick={() => setShow(!show)}>
        <FaChevronDown />
      </ToggleButton>
      {onlineUsers.map((user: onlineUser) => (
        <User show={show}>
          <IconWrapper
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
            <Icon />
          </IconWrapper>
          <Name>{mode === 'Conversation' ? user.name[1] : user.name[0]}</Name>
        </User>
      ))}
    </Wrapper>
  )
}

export default ChatDrawer

const Wrapper = styled.div`
  position: absolute;
  bottom: 100px;
  height: ${(props: { show: boolean }) => (props.show ? '137px' : '0px')};
  padding: ${(props: { show: boolean }) => (props.show ? '32px 32px' : '12px 32px')};
  left: 0;
  width: 100%;
  border-radius: 30px 30px 0px 0px;
  background-color: ${({ theme }) => theme.bg.tint};
  box-shadow: 0px -1px ${({ theme }) => theme.divider};
  display: flex;
  transition: all 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);

  @media (max-width: ${MEDIA_BREAK}) {
    bottom: 98px;
  }
`

const ToggleButton = styled.div`
  position: absolute;
  top: 5px;
  left: 50%;
  transform: ${(props: { show: boolean }) => (props.show ? 'translateX(50%)' : 'translateX(50%) rotate(180deg)')};
  color: ${({ theme }) => theme.nav.main};
  cursor: pointer;
  font-size: 20px;
`

const User = styled.div`
  text-align: center;
  margin-right: 20px;
  display: ${(props: { show: boolean }) => (props.show ? 'block' : 'none')};
`

const IconWrapper = styled(Badge)`
  .MuiBadge-dot {
    height: 10px;
    width: 10px;
    border-radius: 6px;
  }

  .MuiBadge-badge {
    bottom: 25%;
    background-color: #44b700;
    color: #44b700;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.bg.tint};
  }

  .MuiBadge-badge::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: ripple 1.2s infinite ease-in-out;
    border: 1px solid currentColor;
    content: '';
  }

  @keyframes ripple {
    0% {
      transform: scale(0.8);
      opacity: 1;
    }
    100% {
      transform: scale(2.4);
      opacity: 0;
    }
  }
`

const Icon = styled(Avatar)`
  border: 2px solid ${({ theme }) => theme.bg.tint};
  box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.divider};
  margin-bottom: 10px;

  margin-left: auto;
  margin-right: auto;

  &.MuiAvatar-root {
    height: 50px;
    width: 50px;
  }
`
const Name = styled.span`
  display: block;
  font-size: 13px;
  font-weight: 500;
`
