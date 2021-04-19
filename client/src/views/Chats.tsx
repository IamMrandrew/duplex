import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { COLOR } from '../components/GlobalStyle'
import { FaPlus } from 'react-icons/fa'
import Chat from '../components/Chat'
import { chat } from '../types/chat'
import { useChatContext } from '../contexts/ChatContext'
import CreateChatModal from '../components/CreateChatModal'

type Props = {
  children?: ReactElement
}

const Chats: React.FC<Props> = () => {
  const chatContext = useChatContext()
  const chats = chatContext.state

  const [showModal, setShowModal] = useState(false)

  return (
    <Wrapper>
      <CreateChatModal showModal={showModal} setShowModal={setShowModal} />
      <Header>
        <Title>Chats</Title>
      </Header>
      <SearchWrapper>
        <SearchBar />
        <AddButton onClick={() => setShowModal(!showModal)}>
          <FaPlus />
        </AddButton>
      </SearchWrapper>
      <SectionTitle>Spaces</SectionTitle>
      {chats
        .sort((a, b) => {
          return a.messages.length > 0 && b.messages.length > 0
            ? new Date(b.messages[b.messages.length - 1].createdAt).getTime() -
                new Date(a.messages[a.messages.length - 1].createdAt).getTime()
            : b.messages.length - a.messages.length
        })
        .map((chat: any) => (
          <Chat key={chat._id} chat={chat} />
        ))}
    </Wrapper>
  )
}

export default Chats

const Wrapper = styled.div`
  grid-area: secondary;
  padding: 24px;

  @media (max-width: 767.99px) {
    padding: 12px;
  }
`
const Header = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
`
const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`

const SectionTitle = styled.h2`
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 17px;
  font-weight: 500;
`

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`

const SearchBar = styled.input`
  display: block;
  flex-basis: calc(100% - 35px - 4px);

  border: none;
  background-color: ${COLOR.bg.box};
  padding: 8px 20px;
  border-radius: 12px;
  outline: none;
  font-size: 16px;
`

const AddButton = styled.button`
  width: 35px;
  height: 35px;
  background-color: ${COLOR.bg.lightgrey};
  border-radius: 12px;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 4px;
  padding: 0px;
  cursor: pointer;

  > svg {
    color: white;
    font-size: 16px;
  }
`
