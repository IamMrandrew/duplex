import React, { ReactElement, useState } from 'react'
import styled from 'styled-components/macro'
import { FaPlus } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import Chat from '../components/Chat'
import { useChatContext } from '../contexts/ChatContext'
import CreateChatModal from '../components/CreateChatModal'
import { MEDIA_BREAK } from '../components/Layout'

type Props = {
  children?: ReactElement
}

const Chats: React.FC<Props> = () => {
  const chatContext = useChatContext()
  const chats = chatContext.state

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <CreateChatModal showModal={showModal} setShowModal={setShowModal} />
      <Wrapper>
        <Header>
          <Title>Chats</Title>
        </Header>
        <ContentSection>
          <SearchWrapper>
            <SearchBar>
              <FiSearch />
              <SearchInput placeholder="Search chat" />
            </SearchBar>
            <AddButton onClick={() => setShowModal(!showModal)}>
              <FaPlus />
            </AddButton>
          </SearchWrapper>
          <Section>
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
          </Section>
        </ContentSection>
      </Wrapper>
    </>
  )
}

export default Chats

const Wrapper = styled.div`
  grid-area: secondary;
  background: ${({ theme }) => theme.bg.tint};
  z-index: 50;
  box-shadow: 3px 0px 2px -2px ${({ theme }) => theme.divider};

  @media (max-width: ${MEDIA_BREAK}) {
    padding: 12px;
    height: 100vh;
  }
`
const Header = styled.div`
  padding: 24px;
  padding-top: 40px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.bg.tint};
  width: 100%;
`

const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  min-height: 30px;
  line-height: 30px;
  color: ${({ theme }) => theme.font.primary};
`

const ContentSection = styled.div`
  padding: 0 12px 0 12px;
`

const Section = styled.div`
  margin-top: 20px;
  background-color: ${({ theme }) => theme.bg.main};
  border-radius: 12px;
  padding-top: 10px;
  overflow: hidden;
`

const SectionTitle = styled.h2`
  margin-bottom: 5px;
  padding: 16px;
  font-size: 17px;
  font-weight: 500;
  color: ${({ theme }) => theme.font.primary};
`

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  flex-basis: calc(100% - 35px - 4px);
  border: none;
  background-color: ${({ theme }) => theme.bg.shade};
  color: ${({ theme }) => theme.font.primary};
  padding: 8px 20px;
  border-radius: 12px;
  outline: none;
  font-size: 16px;

  svg {
    color: ${({ theme }) => theme.font.secondary};
    margin-right: 8px;
  }
`

const SearchInput = styled.input`
  display: block;
  flex-basis: calc(100% - 35px - 4px);
  border: none;
  background-color: ${({ theme }) => theme.bg.shade};
  color: ${({ theme }) => theme.font.primary};
  border-radius: 12px;
  outline: none;
  font-size: 16px;

  ::placeholder {
    color: ${({ theme }) => theme.font.secondary};
  }
`

const AddButton = styled.button`
  width: 35px;
  height: 35px;
  background-color: ${({ theme }) => theme.primary.main};
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
