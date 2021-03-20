import { Button, TextField } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'
import { COLOR } from '../components/GlobalStyle'
import { MEDIA_BREAK } from '../components/Layout'

type Props = {
  children?: ReactElement
}

const Login = (props: Props): ReactElement => {
  const { children, ...rest } = props
  const [input, setInput] = useState({
    username: { value: '', errMsg: '' },
    password: { value: '', errMsg: '' },
  })

  const [isLogin, setIsLogin] = useState(true)

  return <Wrapper>{isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <SignupForm setIsLogin={setIsLogin} />}</Wrapper>
}

export default Login

type FormProps = {
  setIsLogin: Function
}

const LoginForm = (props: FormProps) => {
  const { setIsLogin } = props
  return (
    <Form>
      <Title>Welcome!</Title>
      <TextInput id="username" label="username" variant="outlined" />
      <TextInput id="password" label="password" variant="outlined" />
      <Link>Forget your password?</Link>
      <Btn variant="contained">Login</Btn>
      <Details>
        Need an account? <Link onClick={() => setIsLogin(false)}>Sign up</Link>
      </Details>
    </Form>
  )
}

const SignupForm = (props: FormProps) => {
  const { setIsLogin } = props
  return (
    <Form>
      <Title>Create a new account</Title>
      <TextInput id="email" label="email" variant="outlined" />
      <TextInput id="username" label="username" variant="outlined" />
      <TextInput id="password" label="password" variant="outlined" />
      <Btn variant="contained">Login</Btn>
      <Link onClick={() => setIsLogin(true)}>Already have an account?</Link>
    </Form>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${COLOR.font.grey};
  border-radius: 5px;
  padding: 20px;
  @media (max-width: ${MEDIA_BREAK}px) {
    width: 100%;
    height: 100vh;
  }
`

const Title = styled.div`
  text-align: center;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 600;
`

const TextInput = styled(TextField)`
  &.MuiTextField-root {
    margin-bottom: 10px;
  }
`

const Btn = styled(Button)`
  &.MuiButton-root {
    margin-bottom: 10px;
  }
`

const Details = styled.div`
  display: flex;
  flex-direction: row;
  color: ${COLOR.font.grey};
  margin-left: 5px;
  margin-bottom: 10px;
  font-size: 14px;
`

const Link = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  margin-left: 5px;
  color: ${COLOR.font.link};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
