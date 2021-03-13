import React, { ReactElement } from 'react'
import styled from 'styled-components/macro'
import { COLOR } from '../components/GlobalStyle'

type Props = {
  children?: ReactElement
}

const Chats: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <Header>
        <Title>Chats</Title>
      </Header>
      <SearchBar />
    </Wrapper>
  )
}

export default Chats

const Wrapper = styled.div`
  grid-area: secondary;
`
const Header = styled.div`
  padding-top: 40px;
  padding-bottom: 10px;
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`

const SearchBar = styled.input`
  display: block;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  border: none;
  background-color: ${COLOR.bg.box};
  padding: 10px 20px;
  border-radius: 18px;
  outline: none;
  font-size: 16px;
`
