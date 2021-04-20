import React, { ReactElement, useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Avatar, IconButton } from '@material-ui/core'
import { IoMdSend } from 'react-icons/io'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { AiFillPhone } from 'react-icons/ai'
import { FaChevronLeft } from 'react-icons/fa'
import Message from '../components/Message'
import { useSocketContext } from '../contexts/SocketContext'
import { useUserContext } from '../contexts/UserContext'
import { useChatContext } from '../contexts/ChatContext'
import { useResponsive } from '../hooks/useResponsive'
import Tooltip from '../components/Tooltip'
import { MEDIA_BREAK } from '../components/Layout'

type Props = {
  children?: ReactElement
}

const ChatArea: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>()
  const { socket } = useSocketContext()
  const userState = useUserContext().state
  const chatContext = useChatContext()
  const { isMobile } = useResponsive()

  const userVideo = useRef()

  const [chat, setChat]: any = useState(null)
  const [messages, setMessages]: any = useState([])
  const [input, setInput] = useState('')

  const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2,
  }

  const vidoeCallClickHandler = () => {
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then((stream) => {
      // userVideo.current.srcObject = stream
    })
  }

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const sendMessageHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (socket) {
      socket.emit('message', {
        id: id,
        content: input,
      })
    }
    setInput('')
  }

  const checkIfIncoming = (message: any): boolean => {
    return !(userState._id === message.sender._id)
  }

  const checkIfContinuous = (message: any, index: number): boolean => {
    return messages[index - 1] ? message.sender._id === messages[index - 1].sender._id : false
  }

  const checkIfEndContinuous = (message: any, index: number): boolean => {
    return messages[index + 1] ? message.sender._id !== messages[index + 1].sender._id : false
  }

  // const createPeer = (userToSignal, callerId, stream) => {

  // }

  // const addPeer = (incomingSignal, callerId, stream) => {

  // }

  useEffect(() => {
    socket?.emit('join', { id })

    setChat(chatContext.state.find((chat) => chat._id === id))

    socket?.emit('readMessage', {
      id: id,
    })

    return () => {
      socket?.emit('leave', { id })
    }
  }, [socket, id])

  useEffect(() => {
    if (chat) {
      setMessages(chat.messages)
    }
  }, [chat])

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (content: any) => {
        // setMessages([...messages, content.message])
        chatContext.updateChatMessage(content.id, content.message)
      })

      socket.on('finishedRead', (content: any) => {
        console.log(chatContext.state)
        chatContext.updateState(
          chatContext.state.map((chat: any) => {
            if (chat._id === content.id) {
              return {
                ...chat,
                messages: [
                  chat.messages.map((message: any) => ({ ...message, readers: [...message.readers, content.userId] })),
                ],
              }
            }
            return chat
          }),
        )
      })
    }

    return () => {
      socket?.off('newMessage')
      socket?.off('finishedRead')
    }
  }, [socket, messages])

  return (
    <Wrapper>
      <Header>
        {isMobile() && (
          <BackButton to="/">
            <FaChevronLeft />
          </BackButton>
        )}
        <TitleWrapper>
          <Icon></Icon>
          <Name>
            {chat
              ? chat.type === 'Spaces'
                ? chat.title
                : chat.users.find((user: any) => user._id !== userState._id).username
              : ''}
          </Name>
          <OperationWrapper>
            <Tooltip title="Video Call">
              <IconBtn>
                <BsFillCameraVideoFill />
              </IconBtn>
            </Tooltip>
            <Tooltip title="Phone Call">
              <IconBtn>
                <AiFillPhone />
              </IconBtn>
            </Tooltip>
          </OperationWrapper>
        </TitleWrapper>
        {isMobile() && <Positioning />}
      </Header>
      <Content>
        {messages &&
          messages.map((message: any, index: number) => (
            <Message
              key={message._id}
              message={message}
              incoming={checkIfIncoming(message)}
              continuing={checkIfContinuous(message, index)}
              endContinuing={checkIfEndContinuous(message, index)}
              type={chat ? chat.type : ''}
            />
          ))}
      </Content>
      <InputWrapper onSubmit={sendMessageHandler}>
        <Input value={input} onChange={inputHandler} />
        <InputButton>
          <IoMdSend />
        </InputButton>
      </InputWrapper>
    </Wrapper>
  )
}

export default ChatArea

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bg.tint};
`

const Header = styled.div`
  padding: 32px;
  padding-top: 40px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.bg.tint};
  box-shadow: 0 3px 2px -2px ${({ theme }) => theme.divider};
  @media (max-width: ${MEDIA_BREAK}) {
    padding: 5px;
  }
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  > :nth-child(1) {
    margin-right: 20px;
  }
`

const Content = styled.div`
  overflow-y: auto;
  height: calc(100vh - 80px - 100px);
  padding: 8px 32px;

  @media (max-width: ${MEDIA_BREAK}) {
    padding: 12px;
    height: calc(100vh - 80px - 60px);
  }
`

const Icon = styled(Avatar)`
  &.MuiAvatar-root {
    height: 30px;
    width: 30px;
  }
`

const Name = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.font.primary};
`

const InputWrapper = styled.form`
  display: flex;
  align-items: center;
  padding: 20px 32px;
  padding-bottom: 32px;
  background-color: ${({ theme }) => theme.bg.tint};

  @media (max-width: ${MEDIA_BREAK}) {
    padding: 20px 12px;
  }
`

const OperationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`

const IconBtn = styled(IconButton)`
  &.MuiButtonBase-root {
    color: ${({ theme }) => theme.font.primary};
  }
`

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: ${({ theme }) => theme.bg.shade};
  color: ${({ theme }) => theme.font.primary};
  padding: 15px;
  border-radius: 18px;
  outline: none;
  font-size: 16px;
`

const InputButton = styled.button`
  background-color: ${({ theme }) => theme.primary.main};
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 7px;
  cursor: pointer;

  > svg {
    background-color: ${({ theme }) => theme.primary.main};
    color: white;
    font-size: 24px;
  }
`

const BackButton = styled(Link)`
  background: none;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  > svg {
    color: ${({ theme }) => theme.font.primary};
    font-size: 18px;
  }
`

const Positioning = styled.div``
