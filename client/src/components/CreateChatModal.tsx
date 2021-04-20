import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Overlay from './Overlay'
import ChatServices from '../services/ChatService'
import { useChatContext } from '../contexts/ChatContext'

type Props = {
  showModal: boolean
  setShowModal: any
}

const CreateChatModal: React.FC<Props> = ({ showModal, setShowModal }) => {
  const [title, setTitle] = useState('')
  const ChatContext = useChatContext()

  const setTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const createChatHandler = () => {
    const data = { type: 'Spaces', title }
    setShowModal(!showModal)
    ChatServices.createChat(data).then((res) => {
      ChatContext.updateState([res.data])
    })
  }

  return (
    <>
      <Overlay showModal={showModal} setShowModal={setShowModal} />
      <Wrapper showModal={showModal}>
        <Card showModal={showModal}>
          <Title>Create a new chat</Title>
          <Input onChange={setTitleHandler} value={title} placeholder="New group name"></Input>
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

  @media (max-width: 767.99px) {
    bottom: 30px;
    transform: ${(props: { showModal: boolean }) => (props.showModal ? 'translate(-50%)' : 'translate(-50%, 100%)')};
  }
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