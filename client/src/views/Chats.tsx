import React, { ReactElement } from 'react'
import styled from 'styled-components/macro'
import { FaPlus } from 'react-icons/fa'
import Chat from '../components/Chat'
import { useChatContext } from '../contexts/ChatContext'

type Props = {
  children?: ReactElement
}

const Chats: React.FC<Props> = () => {
  const chatContext = useChatContext()
  const chats = chatContext.state

  return (
    <Wrapper>
      <Header>
        <Title>Chats</Title>
      </Header>
      <ContentSection>
        <SearchWrapper>
          <SearchBar />
          <AddButton>
            <FaPlus />
          </AddButton>
        </SearchWrapper>
        <SectionTitle>Spaces</SectionTitle>
        {chats.map((chat: any) => (
          <Chat key={chat._id} chat={chat} />
        ))}
      </ContentSection>
    </Wrapper>
  )
}

export default Chats

const Wrapper = styled.div`
  grid-area: secondary;
  background: ${({theme})=>theme.bg.main};
  @media (max-width: 767.99px) {
    padding: 12px;
  }
`
const Header = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${({theme})=>theme.bg.main};
  box-shadow: 0 3px 2px -2px gray;
  min-height: 60px;
  width: 100%;
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  color: ${({theme}) => theme.font.primary}
`

const ContentSection = styled.div`
  padding: 0 24px 0 24px;
`

const SectionTitle = styled.h2`
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 17px;
  font-weight: 500;
  color: ${({theme})=>theme.font.primary}
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
  background-color: ${({theme})=>theme.bg.shade};
  color: ${({theme})=>theme.font.primary};
  padding: 8px 20px;
  border-radius: 12px;
  outline: none;
  font-size: 16px;
`

const AddButton = styled.button`
  width: 35px;
  height: 35px;
  background-color: ${({theme})=>theme.primary.main};
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
