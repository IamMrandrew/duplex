import { Button, TextField } from '@material-ui/core'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { MEDIA_BREAK } from '../components/Layout'
import Toast from '../components/Toast'
import { useUserContext } from '../contexts/UserContext'
import { checkIntegrity, formNoErr, toData, VALIDATORS } from '../formIntegrity'
import { LOCATIONS } from '../Routes'
import UserServices from '../services/UserService'
import { getUrlLastSegmant } from '../utils'

const Login = (): ReactElement => {
  const redirectedAs = () => {
    return getUrlLastSegmant() === LOCATIONS.login ? true : false
  }

  const [isLogin, setIsLogin] = useState(redirectedAs())
  const [toastMessage, setToastMessage] = useState({
    content: '',
    variant: 'error' as 'error' | 'info' | 'success' | 'warning'
  })
  const [showToast, setShowToast] = useState(false)

  return (
    <>
      <Toast message={toastMessage.content} setShow={setShowToast} show={showToast} duration={5000} variant={toastMessage.variant}/>
      <Wrapper>
        {
          isLogin
          ? <LoginForm setIsLogin={setIsLogin} setToastMessage={setToastMessage} setShowToast={setShowToast}/>
          : <SignupForm setIsLogin={setIsLogin} setToastMessage={setToastMessage} setShowToast={setShowToast}/>}
      </Wrapper>
    </>
  )
}

export default Login

type FormProps = {
  setIsLogin: Function
  setToastMessage: Function
  setShowToast: Function
}

const LoginForm = (props: FormProps) => {
  const { setIsLogin, setToastMessage, setShowToast } = props
  const [input, setInput] = useState({
    emailOrUsername: { value: '', errMsg: '' },
    password: { value: '', errMsg: '' },
  })
  const [loading, setLoading]  = useState(false)
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
      setLoading(true)
      UserServices.login(toData(input))
        .then((res) => {
          setLoading(false)
          userState.updateState(res.data.user)
          history.push('/')
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
          setShowToast(true)
          setToastMessage({
            content: err.response.data.message,
            variant: 'error'
          })
        })
    }
  }

  return (
    <Form>
      <Title>Welcome back</Title>
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
        label="Password"
        variant="outlined"
        type="password"
        onChange={handleInputChange}
        error={!!input.password.errMsg}
        helperText={input.password.errMsg}
      />
      <Link>Forget your password?</Link>
      <Btn variant="contained" onClick={handleSubmit} disabled={loading}>
        Login
      </Btn>
      <Details>
        Need an account? <Link onClick={() => setIsLogin(false)}>Sign up</Link>
      </Details>
    </Form>
  )
}

const SignupForm = (props: FormProps) => {
  const { setIsLogin, setToastMessage, setShowToast } = props
  const [input, setInput] = useState({
    email: { value: '', errMsg: '' },
    username: { value: '', errMsg: '' },
    password: { value: '', errMsg: '' },
  })
  const [loading, setLoading] = useState(false)


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
      setLoading(true)
      UserServices.signup(toData(input))
        .then((res) => {
          setIsLogin(true)
          setLoading(false)
          setToastMessage({
            content: 'Signup success, please login.',
            variant: 'success'
          })
          setShowToast(true)
        })
        .catch((err) => {
          setToastMessage({
            content: err.response.data.message,
            variant: 'error'
          })
          setShowToast(true)
          setLoading(false)
        })
    }
  }

  return (
    <Form>
      <Title>Create a new account</Title>
      <TextInput
        id="email"
        label="Email"
        variant="outlined"
        onChange={handleInputChange}
        error={!!input.email.errMsg}
        helperText={input.email.errMsg}
      />
      <TextInput
        id="username"
        label="Username"
        variant="outlined"
        onChange={handleInputChange}
        error={!!input.username.errMsg}
        helperText={input.username.errMsg}
      />
      <TextInput
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        onChange={handleInputChange}
        error={!!input.password.errMsg}
        helperText={input.password.errMsg}
      />
      <Btn variant="contained" onClick={handleSubmit} disabled={loading}>
        Sign up
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
  background-color: ${({ theme }) => theme.primary.main};
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid ${({ theme }) => theme.font.primary}; */
  border-radius: 5px;
  padding: 40px;
  min-width: 325px;
  background-color: ${({ theme }) => theme.bg.tint};
  @media (max-width: ${MEDIA_BREAK}px) {
    width: 100%;
    height: 100vh;
  }
`

const Title = styled.div`
  text-align: left;
  margin-top: 10px;
  margin-bottom: 30px;
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
    background-color: ${({ theme }) => theme.primary.main};
    color: ${({ theme }) => theme.font.contrast};
    margin-bottom: 10px;

    &:hover {
      background-color: ${({ theme }) => theme.primary.shade};
    }
  }
`

const Details = styled.div`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.font.secondary};
  margin-left: 5px;
  margin-bottom: 10px;
  font-size: 14px;
`

const Link = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  margin-left: 5px;
  color: ${({ theme }) => theme.primary.main};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
