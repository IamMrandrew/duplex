import React, { ReactElement, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Avatar, IconButton} from '@material-ui/core'
import { IoMdSend } from 'react-icons/io'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { AiFillPhone } from 'react-icons/ai'
import { FaChevronLeft } from 'react-icons/fa'
import Message from '../components/Message'
import { useSocketContext } from '../contexts/SocketContext'
import { useUserContext } from '../contexts/UserContext'
import { useChatContext } from '../contexts/ChatContext'
import { useResponsive } from '../hooks/useResponsive'
import { MEDIA_BREAK } from '../components/Layout'
import Tooltip from '../components/Tooltip'
import Peer from 'simple-peer'
import VideoContainer from '../components/VideoContainer'

type Props = {
  children?: ReactElement
}

const ChatArea: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>()
  const { socket } = useSocketContext()
  const userState = useUserContext().state
  const chatContext = useChatContext()
  const { isMobile } = useResponsive()
  
  // video call vars
  const [videoCalling, setVideoCalling] = useState(false)
  const [displayingVideo, setDisplayingVideo] = useState(false)

  const [chat, setChat]: any = useState({})
  const [messages, setMessages]: any = useState([])
  const [input, setInput] = useState('')
  
  const vidoeCallClickHandler = () => {
    if(setVideoCalling){
      setVideoCalling(true)
      setDisplayingVideo(true)
    }
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

  const createPeer = (userToSignal:string, callerId: string, stream:MediaStream) => {
    const newPeer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    })

    newPeer.on('signal', signal => {
      console.log('sendingSignal')
      socket?.emit('sendSignal', {userToSignal, callerId, signal})
    })

    return newPeer
  }

  const addPeer = (incomingSignal:string, callerId:string, stream:MediaStream) => {
    const newPeer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    newPeer.on('signal', signal => {
      socket?.emit('returnSignal', {signal, callerId})
    })

    newPeer.signal(incomingSignal)

    return newPeer
  }

  useEffect(()=>{
    return () => {
      socket?.emit('leaveVideoCall', { id })
    }
  }, [])

  useEffect(() => {
    socket?.emit('join', { id })

    setChat(chatContext.state.find((chat) => chat._id === id))

    return () => {
      socket?.emit('leave', { id })
    }
  }, [socket, id, chatContext.state])

  useEffect(() => {
    if (chat) {
      setMessages(chat.messages)
    }
  }, [chat])

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (message: any) => {
        setMessages([...messages, message])
        chatContext.updateChatMessage(id, chat, message)
      })
    }

    return () => {
      socket?.off('newMessage')
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
          <Name>{chat ? chat.title : ''}</Name>
          <OperationWrapper>
            <Tooltip title='Video Call'>
              <IconBtn onClick={vidoeCallClickHandler}>
                <BsFillCameraVideoFill />
              </IconBtn>
            </Tooltip>
            <Tooltip title='Phone Call'>
              <IconBtn>
                <AiFillPhone />
              </IconBtn>
            </Tooltip>
          </OperationWrapper>
        </TitleWrapper>
        {isMobile() && <Positioning />}
      </Header>
      {
        videoCalling && <VideoContainer displayingVideo={displayingVideo} setDisplayingVideo={setDisplayingVideo} setVideoCalling={setVideoCalling}/>
      }
      {
        !displayingVideo && (
          <Content>
            {messages &&
              messages.map((message: any, index: number) => (
                <Message
                  key={message._id}
                  message={message}
                  incoming={checkIfIncoming(message)}
                  continuing={checkIfContinuous(message, index)}
                  endContinuing={checkIfEndContinuous(message, index)}
                />
              ))}
          </Content>
        )
      }
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
    color: ${({theme})=>theme.font.primary};
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
    color: ${({theme})=>theme.font.primary};
    font-size: 18px;
  }
`

const Positioning = styled.div``
