import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Overlay from './Overlay'
import ChatServices from '../services/ChatService'
import { useChatContext } from '../contexts/ChatContext'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { MEDIA_BREAK } from './Layout'
import Toast from '../components/Toast'
import { useSocketContext } from '../contexts/SocketContext'

type Props = {
  showModal: boolean
  setShowModal: any
  matchChat: any
}

const CreateChatModal: React.FC<Props> = ({ showModal, setShowModal, matchChat }) => {
  const [title, setTitle] = useState('')
  const [username, setUsername] = useState('')
  const [value, setValue] = useState(0)
  const ChatContext = useChatContext()
  const { socket } = useSocketContext()
  const [toastMessage, setToastMessage] = useState({
    content: '',
    variant: 'error' as 'error' | 'info' | 'success' | 'warning',
  })
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    setTitle('')
    setUsername('')
  }, [showModal])

  const setTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const setUsernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const createChatHandler = () => {
    const data = matchChat
      ? value
        ? { type: 'Direct', mode: 'Conversation', username }
        : { type: 'Spaces', mode: 'Conversation', title }
      : value
      ? { type: 'Direct', mode: 'Chat', username }
      : { type: 'Spaces', mode: 'Chat', title }

    ChatServices.createChat(data)
      .then((res) => {
        ChatContext.updateState([res.data])
        socket?.emit('created chat')
        setShowModal(!showModal)
        setTitle('')
        setUsername('')
      })
      .catch((err) => {
        setShowToast(true)
        setToastMessage({
          content: err.response.data.message,
          variant: 'error',
        })
        console.log(err.response.data.message)
      })
  }

  const tabsChangeHandler = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Toast
        message={toastMessage.content}
        setShow={setShowToast}
        show={showToast}
        duration={5000}
        variant={toastMessage.variant}
      />
      <Overlay showModal={showModal} setShowModal={setShowModal} />
      <Wrapper showModal={showModal}>
        <Card showModal={showModal}>
          <Title>Create a new {matchChat ? 'conversation' : 'chat'}</Title>
          <CustomTabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={tabsChangeHandler}
            aria-label="disabled tabs example"
          >
            <Tab label="Spaces" />
            <Tab label="Direct Message" />
          </CustomTabs>
          <Input
            onChange={value ? setUsernameHandler : setTitleHandler}
            value={value ? username : title}
            placeholder={value ? 'Enter his/her username' : 'New group name'}
          ></Input>
          <Button onClick={createChatHandler}>Create</Button>
        </Card>
      </Wrapper>
    </>
  )
}

export default CreateChatModal

const Wrapper = styled.div`
  position: absolute;
  bottom: 50%;
  left: 50%;
  z-index: 1000;
  width: 100%;
  transform: translate(-50%, 50%);
  padding: 20px;
  opacity: ${(props: { showModal: boolean }) => (props.showModal ? '100%' : '0%')};
  pointer-events: none;
  transition: all 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
`

const Card = styled.div`
  max-width: 370px;
  background-color: ${({ theme }) => theme.bg.tint};
  border-radius: 12px;
  padding: 40px 30px;
  margin-left: auto;
  margin-right: auto;
  pointer-events: ${(props: { showModal: boolean }) => (props.showModal ? 'all' : 'none')};
`

const Title = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.font.primary};
`

const Input = styled.input`
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.bg.shade};
  border: none;
  outline: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.font.primary};
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  margin-bottom: 12px;

  &::placeholder {
    color: ${({ theme }) => theme.font.secondary};
  }
`

const Button = styled.button`
  display: block;
  padding: 8px 15px;
  background-color: ${({ theme }) => theme.primary.main};
  border: none;
  outline: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
  margin-left: auto;
  margin-right: left;
  color: white;
  cursor: pointer;
`
const CustomTabs = styled(Tabs)`
  margin-bottom: 20px;

  .MuiTab-textColorPrimary {
    color: ${({ theme }) => theme.font.secondary};
  }

  .MuiTab-textColorPrimary.Mui-selected {
    color: ${({ theme }) => theme.nav.main};
  }

  .PrivateTabIndicator-colorPrimary-2 {
    background-color: ${({ theme }) => theme.nav.main};
  }

  .MuiTab-root {
    text-transform: none;
    font-size: 16px;
  }
`

const Error = styled.span`
  display: block;
  font-size: 14px;
  color: ${({ theme }) => theme.error.main};
`
