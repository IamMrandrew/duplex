import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Overlay from './Overlay'
import UserServices from '../services/UserService'
import { useUserContext } from '../contexts/UserContext'
import { MEDIA_BREAK } from './Layout'

type Props = {
  showModal: boolean
  setShowModal: any
  selected: number
}

const EditProfileModal: React.FC<Props> = ({ showModal, setShowModal, selected }) => {
  const userContext = useUserContext()
  const [name, setName] = useState<string>('')
  const [bio, setBio] = useState<string>('')

  useEffect(() => {
    if (userContext.state && userContext.state.profile) {
      setName(userContext.state.profile[selected].name)
      setBio(userContext.state.profile[selected].bio)
    }
  }, [userContext.state.profile, selected])

  const setNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const setBioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value)
  }

  const updateProfileHandler = () => {
    const data = { name, bio, selected }
    setShowModal(!showModal)
    UserServices.updateProfile(data)
      .then((res) => {
        userContext.setState(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Overlay showModal={showModal} setShowModal={setShowModal} />
      <Wrapper showModal={showModal}>
        <Card showModal={showModal}>
          <Title>Edit profile</Title>
          <Label>Display name</Label>
          <Input onChange={setNameHandler} value={name} placeholder={'What'} />
          <Label>Bio</Label>
          <Input onChange={setBioHandler} value={bio} placeholder={'Tell me something about yourself'} />
          <Button onClick={updateProfileHandler}>Save</Button>
        </Card>
      </Wrapper>
    </>
  )
}

export default EditProfileModal

const Wrapper = styled.div`
  position: absolute;
  bottom: 50%;
  left: 50%;
  z-index: 1000;
  width: 100%;
  transform: translate(-50%, 50%);
  padding: 20px;
  opacity: ${(props: { showModal: boolean }) => (props.showModal ? '100%' : '0%')};
  pointer-events: none;
  transition: all 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);

  @media (max-width: ${MEDIA_BREAK}) {
    bottom: 30px;
    transform: ${(props: { showModal: boolean }) => (props.showModal ? 'translate(-50%)' : 'translate(-50%, 100%)')};
  }
`

const Card = styled.div`
  max-width: 370px;
  background-color: ${({ theme }) => theme.bg.tint};
  border-radius: 12px;
  padding: 40px 30px;
  margin-left: auto;
  margin-right: auto;
  pointer-events: ${(props: { showModal: boolean }) => (props.showModal ? 'all' : 'none')};
`

const Title = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.font.primary};
`

const Label = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.font.primary};
`

const Input = styled.input`
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.bg.shade};
  border: none;
  outline: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.font.primary};
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  margin-bottom: 16px;

  &::placeholder {
    color: ${({ theme }) => theme.font.secondary};
  }
`

const Button = styled.button`
  display: block;
  padding: 8px 15px;
  background-color: ${({ theme }) => theme.primary.main};
  border: none;
  outline: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
  margin-left: auto;
  margin-right: left;
  color: white;
  cursor: pointer;
`
