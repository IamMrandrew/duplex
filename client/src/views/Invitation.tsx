import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core'
import React, { ChangeEvent, useEffect, useState,  } from 'react'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components'
import Progress from '../components/Progress'
import { useChatContext } from '../contexts/ChatContext'
import { useSettingContext } from '../contexts/SettingContext'
import { useSocketContext } from '../contexts/SocketContext'
import { LOCATIONS, toPath } from '../Routes'
import ChatServices from '../services/ChatService'

const Invitation: React.FC = () => {
  const { id } = useParams<{ id:string }>()
  const [loading, setLoading] = useState(true)
  const { setState } = useChatContext()
  const { socket, connectSocket } = useSocketContext()
  const history = useHistory()

  useEffect(()=>{
    ChatServices.joinChat(id).then(()=>{
      history.push(toPath(LOCATIONS.chat, id))
      socket?.emit('joined spaces')
    }).catch((err)=>{
      setLoading(false)
      console.log(err)
    })
  }, [])

  return (
    <Wrapper>
      <Progress />
      <Description>{`Joining Spaces...`}</Description>
    </Wrapper>
  )
}

export default Invitation

const Wrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: ${({theme})=>theme.bg.tint};
  color: ${({theme})=>theme.font.primary};
  transition: 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 100;
`
const Description = styled.div`
  color: ${({theme})=>theme.font.primary};
`