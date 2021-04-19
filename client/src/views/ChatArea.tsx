import React, { ReactElement, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Avatar } from '@material-ui/core'
import { IoMdSend } from 'react-icons/io'
import Message from '../components/Message'
import { useSocketContext } from '../contexts/SocketContext'
import { useUserContext } from '../contexts/UserContext'
import { useChatContext } from '../contexts/ChatContext'

type Props = {
  children?: ReactElement
}

const ChatArea: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>()
  const { socket } = useSocketContext()
  const userState = useUserContext().state
  const chatContext = useChatContext()

  const [chat, setChat]: any = useState({})
  const [messages, setMessages]: any = useState([])
  const [input, setInput] = useState('')

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const sendMessageHandler = () => {
    if (socket) {
      socket.emit('message', {
        id: id,
        content: input,
      })
    }
    setInput('')
  }

  const checkIfIncoming = (message: any) => {
    return !(userState._id === message.sender._id)
  }

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
        <TitleWrapper>
          <Icon></Icon>
          <Name>{chat ? chat.title : ''}</Name>
        </TitleWrapper>
      </Header>
      <Content>
        {messages &&
          messages.map((message: any) => (
            <Message key={message._id} message={message} incoming={checkIfIncoming(message)} />
          ))}
      </Content>
      <InputWrapper>
        <Input value={input} onChange={inputHandler} />
        <InputButton onClick={sendMessageHandler}>
          <IoMdSend />
        </InputButton>
      </InputWrapper>
    </Wrapper>
  )
}

export default ChatArea

const Wrapper = styled.div`
  background-color: ${({theme})=>theme.bg.tint};
`

const Header = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${({theme})=>theme.bg.tint};
  box-shadow: 0 3px 2px -2px gray;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  > :nth-child(1) {
    margin-right: 20px;
  }
`

const Content = styled.div`
  overflow-y: auto;
  height: calc(100vh - 60px - 100px);
  padding: 8px 32px;

  @media (max-width: 767.99px) {
    padding: 12px;
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
  color: ${({theme})=>theme.font.primary}
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 32px;
  padding-bottom: 32px;
  background-color: ${({theme})=>theme.bg.tint};
  box-shadow: 0px 0 5px ${({theme})=>theme.divider};
  @media (max-width: 767.99px) {
    padding: 20px 12px;
  }
`

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: ${({theme})=>theme.bg.main};
  color: ${({theme})=>theme.font.primary};
  padding: 15px;
  border-radius: 18px;
  outline: none;
  font-size: 16px;
`

const InputButton = styled.button`
  background-color: ${({theme})=>theme.primary.main};
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
    background-color: ${({theme})=>theme.primary.main};
    color: white;
    font-size: 24px;
  }
`
