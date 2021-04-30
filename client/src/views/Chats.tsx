import React, { ReactElement, useState } from 'react'
import styled from 'styled-components/macro'
import { FaPlus, FaChevronRight } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import Chat from '../components/Chat'
import { useChatContext } from '../contexts/ChatContext'
import CreateChatModal from '../components/CreateChatModal'
import { MEDIA_BREAK } from '../components/Layout'
import { useRouteMatch } from 'react-router-dom'
import { useResponsive } from '../hooks/useResponsive'

type Props = {
  children?: ReactElement
  setShowNav: any
  showNav: boolean
}

const Chats: React.FC<Props> = ({ setShowNav, showNav }) => {
  const chatContext = useChatContext()
  const [showModal, setShowModal] = useState(false)
  const { isMobile } = useResponsive()

  let matchChat = useRouteMatch('/conversation')

  return (
    <>
      <CreateChatModal showModal={showModal} setShowModal={setShowModal} matchChat={matchChat} />
      <Wrapper showNav={showNav}>
        <Header>
          {isMobile() && (
            <BackButton showNav={showNav} onClick={() => setShowNav((prev: any) => !prev)}>
              <FaChevronRight />
            </BackButton>
          )}
          <Title>{matchChat ? 'Conversation' : 'Chats'}</Title>
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
            {chatContext.state
              .filter((chat) => chat.type === 'Spaces')
              .filter((chat) => (matchChat ? chat.mode === 'Conversation' : chat.mode === 'Chat'))
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
          <Section>
            <SectionTitle>Direct Messages</SectionTitle>
            {chatContext.state
              .filter((chat) => chat.type === 'Direct')
              .filter((chat) => (matchChat ? chat.mode === 'Conversation' : chat.mode === 'Chat'))
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
  overflow: scroll;

  @media (max-width: ${MEDIA_BREAK}) {
    padding: 12px;
    height: 100vh;
    transform: ${(props: { showNav: boolean }) => (props.showNav ? 'translateX(85px)' : 'translateX(0)')};
    transition: all 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
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

const BackButton = styled.button`
  background: none;
  border: none;
  outline: none;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;

  > svg {
    color: ${({ theme }) => theme.font.primary};
    font-size: 18px;
    transform: ${(props: { showNav: boolean }) => (props.showNav ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: all 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
  }
`
