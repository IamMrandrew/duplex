import React, { ReactElement } from 'react'
import styled from 'styled-components/macro'
import { Avatar } from '@material-ui/core'
import { COLOR } from '../components/GlobalStyle'
import { IoMdSend } from 'react-icons/io'
import Message from '../components/Message'

type Props = {
  children?: ReactElement
}

const ChatArea: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <Header>
        <TitleWrapper>
          <Icon></Icon>
          <Name>Ellis Jane</Name>
        </TitleWrapper>
      </Header>
      <Content>
        <Message />
      </Content>
      <InputWrapper>
        <Input />
        <InputButton>
          <IoMdSend />
        </InputButton>
      </InputWrapper>
    </Wrapper>
  )
}

export default ChatArea

const Wrapper = styled.div`
  background-color: ${COLOR.bg.palegrey};
`

const Header = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${COLOR.bg.light};
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  > :nth-child(1) {
    margin-right: 20px;
  }
`

const Content = styled.div`
  overflow-y: scroll;
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
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 32px;
  padding-bottom: 32px;
  background-color: ${COLOR.bg.light};

  @media (max-width: 767.99px) {
    padding: 20px 12px;
  }
`

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: ${COLOR.bg.box};
  padding: 15px;
  border-radius: 18px;
  outline: none;
  font-size: 16px;
`

const InputButton = styled.button`
  background-color: ${COLOR.primary.shaded};
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
    color: ${COLOR.bg.light};
    font-size: 24px;
  }
`
