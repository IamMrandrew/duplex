import React, { ReactElement } from 'react'
import styled from 'styled-components/macro'
import { COLOR } from '../components/GlobalStyle'
import { FaPlus } from 'react-icons/fa'
import Chat from '../components/Chat'

type Props = {
  children?: ReactElement
}

const Chats: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <Header>
        <Title>Chats</Title>
      </Header>
      <SearchWrapper>
        <SearchBar />
        <AddButton>
          <FaPlus />
        </AddButton>
      </SearchWrapper>
      <SectionTitle>Messages</SectionTitle>
      <Chat />
      <Chat />
      <Chat />
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
