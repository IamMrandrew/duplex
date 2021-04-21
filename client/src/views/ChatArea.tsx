import React, { ReactElement, useState, useEffect, RefObject, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Avatar, Badge, IconButton} from '@material-ui/core'
import { IoMdSend } from 'react-icons/io'
import { BsFillCameraVideoFill, BsFillPersonPlusFill } from 'react-icons/bs'
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
import { COLOR } from '../components/GlobalStyle'
import InviteModal from '../components/InviteModal'
import ChatService from '../services/ChatService'

type Props = {
  children?: ReactElement
}

const ChatArea: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>()
  const { socket } = useSocketContext()
  const userState = useUserContext().state
  const chatContext = useChatContext()
  const { isMobile } = useResponsive()
  const contentRef = useRef() as RefObject<HTMLDivElement>
  
  // video call vars
  const [videoCalling, setVideoCalling] = useState(false) // terminate video call
  const [displayingVideo, setDisplayingVideo] = useState(false) // can go back to text chating without terminating the video call

  const [showModal, setShowModal] = useState(false)

  const [chat, setChat]: any = useState(null)
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

  // Identify message type
  const checkIfIncoming = (message: any): boolean => {
    if (message.sender) {
      return !(userState._id === message.sender._id)
    }
    return false
  }

  const checkIfContinuous = (message: any, index: number): boolean => {
    if (message.sender) {
      return messages[index - 1]
        ? messages[index - 1].sender
          ? message.sender._id === messages[index - 1].sender._id
          : false
        : false
    }
    return false
  }

  const checkIfEndContinuous = (message: any, index: number): boolean => {
    if (message.sender) {
      return messages[index + 1]
        ? messages[index + 1].sender
          ? message.sender._id !== messages[index + 1].sender._id
          : false
        : false
    }
    return false
  }

  const scrollBottom = () => {
    contentRef.current?.scrollTo({top: contentRef.current.scrollHeight, behavior: 'smooth'})
  }

  // When user enter chat
  useEffect(() => {
    scrollBottom()
    socket?.emit('join', { id })

    socket?.emit('readMessage', {
      id: id,
    })

    return () => {
      socket?.emit('leave', { id })
    }
  }, [socket, id])

  // Find chat from chats
  useEffect(() => {
    if (chatContext.state.find((chat) => chat._id === id)) {
      setChat(chatContext.state.find((chat) => chat._id === id))
    }
  }, [socket, id, chatContext.state])

  // Set messages from chat
  useEffect(() => {
    scrollBottom()
    if (chat) {
      setMessages(chat.messages)
    }
    contentRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [chat])

  // Socket listening event (New message received and Read message update)
  useEffect(() => {
    scrollBottom()
    if (socket) {
      socket.on('newMessage', (content: any) => {
        chatContext.updateChatMessage(content.id, content.message)

        socket?.emit('readMessage', {
          id: id,
        })
      })

      socket.on('finishedRead', (content: any) => {
        chatContext.setState(
          chatContext.state.map((chat: any) => {
            if (chat._id === content.id) {
              return {
                ...chat,
                messages: chat.messages.map((message: any) => {
                  if (!message.readers.find((reader: any) => reader === content.userId)) {
                    return { ...message, readers: [...message.readers, content.userId] }
                  }
                  return message
                }),
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
  }, [socket, id, messages, chatContext])

  return (
    <>
      <InviteModal showModal={showModal} setShowModal={setShowModal}/>
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
              {
                chat && chat.type === 'Spaces' && (
                  <IconBtn onClick={()=>{setShowModal(true)}}>
                    <BsFillPersonPlusFill />
                  </IconBtn>
                )
              }
              <Tooltip title={videoCalling && !displayingVideo ? 'Back to the call': 'Video Call'}>
                {
                  videoCalling ? (
                    <Identifier badgeContent=' ' color='error' overlap='circle' variant='dot'>
                      <IconBtn onClick={vidoeCallClickHandler}>
                        <BsFillCameraVideoFill />
                      </IconBtn>
                    </Identifier>
                  ) : (
                    <IconBtn onClick={vidoeCallClickHandler}>
                      <BsFillCameraVideoFill />
                    </IconBtn>
                  )
                }
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
        {
          videoCalling && <VideoContainer displayingVideo={displayingVideo} setDisplayingVideo={setDisplayingVideo} setVideoCalling={setVideoCalling}/>
        }
        {
          !displayingVideo && (
            <Content ref={contentRef}>
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
          )
        }
        <InputWrapper onSubmit={sendMessageHandler}>
          <Input value={input} onChange={inputHandler} />
          <InputButton>
            <IoMdSend />
          </InputButton>
        </InputWrapper>
      </Wrapper>
    </>
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

const Identifier = styled(Badge)`
  &.MuiBadge-root > .MuiBadge-badge{
    top: 25%;
    right: 27%;
  }
`

const Positioning = styled.div``
