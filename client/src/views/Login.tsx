import { Button, TextField } from '@material-ui/core'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { COLOR } from '../components/GlobalStyle'
import { MEDIA_BREAK } from '../components/Layout'
import { useUserContext } from '../contexts/UserContext'
import { checkIntegrity, formNoErr, toData, VALIDATORS } from '../formIntegrity'
import UserServices from '../services/UserService'

type Props = {
  children?: ReactElement
}

const Login = (props: Props): ReactElement => {
  const { children, ...rest } = props

  const [isLogin, setIsLogin] = useState(true)

  return <Wrapper>{isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <SignupForm setIsLogin={setIsLogin} />}</Wrapper>
}

export default Login

type FormProps = {
  setIsLogin: Function
}

const LoginForm = (props: FormProps) => {
  const { setIsLogin } = props
  const [input, setInput] = useState({
    emailOrUsername: { value: '', errMsg: '' },
    password: { value: '', errMsg: '' },
  })
  const history = useHistory()
  const userState = useUserContext()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextState = input
    nextState[e.target.id as keyof typeof input] = { value: e.target.value, errMsg: '' }
    setInput({ ...nextState })
  }

  const handleSubmit = () => {
    const emailOrUsername = checkIntegrity(input.emailOrUsername, [VALIDATORS.REQUIRED])
    const password = checkIntegrity(input.password, [VALIDATORS.REQUIRED])
    setInput({ ...input, emailOrUsername, password })
    if (formNoErr(input)) {
      UserServices.login(toData(input))
        .then((res) => {
          console.log(res)
          userState.updateState(res.data.user)
          history.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <Form>
      <Title>Welcome!</Title>
      <TextInput
        id="emailOrUsername"
        label="Email or Username"
        variant="outlined"
        onChange={handleInputChange}
        error={!!input.emailOrUsername.errMsg}
        helperText={input.emailOrUsername.errMsg}
      />
      <TextInput
        id="password"
        label="password"
        variant="outlined"
        type="password"
        onChange={handleInputChange}
        error={!!input.password.errMsg}
        helperText={input.password.errMsg}
      />
      <Link>Forget your password?</Link>
      <Btn variant="contained" onClick={handleSubmit}>
        Login
      </Btn>
      <Details>
        Need an account? <Link onClick={() => setIsLogin(false)}>Sign up</Link>
      </Details>
    </Form>
  )
}

const SignupForm = (props: FormProps) => {
  const { setIsLogin } = props
  const [input, setInput] = useState({
    email: { value: '', errMsg: '' },
    username: { value: '', errMsg: '' },
    password: { value: '', errMsg: '' },
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextState = input
    nextState[e.target.id as keyof typeof input] = { value: e.target.value, errMsg: '' }
    setInput({ ...nextState })
  }

  const handleSubmit = () => {
    const email = checkIntegrity(input.email, [VALIDATORS.REQUIRED, VALIDATORS.EMAIL])
    const username = checkIntegrity(input.username, [VALIDATORS.REQUIRED])
    const password = checkIntegrity(input.password, [VALIDATORS.REQUIRED])
    setInput({ ...input, email, username, password })
    if (formNoErr(input)) {
      UserServices.signup(toData(input))
        .then((res) => {
          setIsLogin(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <Form>
      <Title>Create a new account</Title>
      <TextInput
        id="email"
        label="email"
        variant="outlined"
        onChange={handleInputChange}
        error={!!input.email.errMsg}
        helperText={input.email.errMsg}
      />
      <TextInput
        id="username"
        label="username"
        variant="outlined"
        onChange={handleInputChange}
        error={!!input.username.errMsg}
        helperText={input.username.errMsg}
      />
      <TextInput
        id="password"
        label="password"
        type="password"
        variant="outlined"
        onChange={handleInputChange}
        error={!!input.password.errMsg}
        helperText={input.password.errMsg}
      />
      <Btn variant="contained" onClick={handleSubmit}>
        Login
      </Btn>
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
