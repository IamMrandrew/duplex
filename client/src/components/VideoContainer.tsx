import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Peer from 'simple-peer'
import { useSocketContext } from '../contexts/SocketContext'
import { useParams } from 'react-router-dom'
import { Button, IconButton } from '@material-ui/core'
import { MEDIA_BREAK } from './Layout'
import { AiOutlineAudio, AiOutlineAudioMuted } from 'react-icons/ai'
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs'
import { FiCamera, FiCameraOff } from 'react-icons/fi'

type Props = {
  displayingVideo: boolean
  setDisplayingVideo: Dispatch<SetStateAction<boolean>>
  setVideoCalling: Dispatch<SetStateAction<boolean>>
  audioChat: boolean
  muteSelf: boolean
  setMuteSelf: Dispatch<SetStateAction<boolean>>
  muteOthers: boolean
  setMuteOthers: Dispatch<SetStateAction<boolean>>
}

const videoConstraints = {
  // height: window.innerHeight / 2,
  // width: window.innerWidth / 2,
}

const VideoContainer: React.FC<Props> = ({
  displayingVideo,
  setDisplayingVideo,
  setVideoCalling,
  audioChat,
  muteSelf,
  setMuteSelf,
  muteOthers,
  setMuteOthers,
}) => {
  const { id } = useParams<{ id: string }>()
  const { socket } = useSocketContext()
  const [peers, setPeers] = useState<any[]>([]) // for rendering
  const userVideo = useRef() as MutableRefObject<HTMLVideoElement> // user itself
  const peersRef = useRef<any[]>([]) // for sending signal
  // const [muteSelf, setMuteSelf] = useState(false)
  // const [muteOthers, setMuteOthers] = useState(false)
  const [closeCam, setCloseCam] = useState(false)
  const userStream = useRef<MediaStream>()

  useEffect(() => {
    startStreaming()

    return () => {
      console.log('leaving room')
      socket?.off('all users')
      socket?.off('user joined')
      socket?.off('receiving returned signal')
      socket?.off('user left')
      socket?.emit('leave room')
      userStream.current?.getTracks().forEach((track: MediaStreamTrack) => {
        track.stop()
      })
    }
  }, [])

  const startStreaming = () => {
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then((stream: MediaStream) => {
      console.log('joining room')
      userStream.current = stream
      userVideo.current.srcObject = userStream.current
      if (audioChat) {
        if (userStream && userStream.current) {
          userStream.current.getVideoTracks()[0].enabled = false
        }
      } else {
        if (userStream && userStream.current) {
          userStream.current.getVideoTracks()[0].enabled = true
        }
      }
      socket?.emit('join room', id)
      socket?.on('all users', (users) => {
        const peers: any[] = []
        users.forEach((userID: string) => {
          const peer = createPeer(userID, socket.id, userStream.current)
          peersRef.current.push({
            peerID: userID,
            peer,
          })
          peers.push({
            peerID: userID,
            peer,
          })
        })
        console.log('On all users', peers)
        setPeers(peers)
      })

      socket?.on('user joined', (payload) => {
        const item = peersRef.current.find((p) => p.peerID === payload.callerID)
        if (!item) {
          const peer = addPeer(payload.signal, payload.callerID, userStream.current)
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          })
          const peerObj = {
            peer,
            peerID: payload.callerID,
          }
          setPeers((users) => {
            const newUsers = users.filter((user) => user.peerID !== peerObj.peerID)
            return [...newUsers, peerObj]
          })
          // setPeers([...peers, peerObj])
        }
      })

      socket?.on('receiving returned signal', (payload) => {
        const item = peersRef.current.find((p) => p.peerID === payload.id)
        item.peer.signal(payload.signal)
      })

      socket?.on('user left', (id) => {
        console.log('user left')
        const peerObj = peersRef.current.find((p) => p.peerID === id)
        if (peerObj && peerObj.peer && peerObj.peer.destory) peerObj.peer.destory()

        const peers = peersRef.current.filter((p) => p.peerID !== id)
        peersRef.current = peers
        setPeers(peers)

        // stream.getTracks().forEach((tracks:MediaStreamTrack) => {
        //     tracks.stop()
        // })
      })
    })
  }

  useEffect(() => {
    if (audioChat) {
      if (userStream && userStream.current) {
        userStream.current.getVideoTracks()[0].enabled = false
      }
    } else {
      if (userStream && userStream.current) {
        userStream.current.getVideoTracks()[0].enabled = true
      }
    }
  }, [audioChat])
  const createPeer = (userToSignal: any, callerID: any, stream: any) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    })

    peer.on('signal', (signal) => {
      socket?.emit('sending signal', { userToSignal, callerID, signal })
    })

    return peer
  }

  const addPeer = (incomingSignal: any, callerID: any, stream: any) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on('signal', (signal) => {
      socket?.emit('returning signal', { signal, callerID })
    })

    peer.signal(incomingSignal)

    return peer
  }

  const toggleSelfMute = () => {
    setMuteSelf(!muteSelf)
  }

  useEffect(() => {
    if (userStream && userStream.current) {
      userStream.current.getAudioTracks()[0].enabled = !userStream.current?.getAudioTracks()[0].enabled
    }
  }, [muteSelf])

  const toggleOthersMute = () => {
    setMuteOthers(!muteOthers)
  }

  useEffect(() => {
    const newPeers = peers
    newPeers.map((peer) => (peer.muted = !muteOthers))
    setPeers(newPeers)
  }, [muteOthers])

  const toggleCloseCam = () => {
    if (userStream && userStream.current) {
      userStream.current.getVideoTracks()[0].enabled = !userStream.current?.getVideoTracks()[0].enabled
      setCloseCam(!closeCam)
    }
  }

  const backToChat = () => {
    setDisplayingVideo(false)
  }

  const LeaveVideoChat = () => {
    // socket?.emit('leave room')
    setDisplayingVideo(false)
    setVideoCalling(false)
    userStream.current?.getTracks().forEach((track: MediaStreamTrack) => {
      // track.stop()
    })
  }

  return (
    <Wrapper displayingVideo={displayingVideo}>
      <VideoWrapper>
        <Video ref={userVideo as MutableRefObject<HTMLVideoElement>} muted autoPlay playsInline />
        {peers.map((peer) => (
          <PeerCell key={peer.peerID} peer={peer.peer} muted={peer.muted} />
        ))}
      </VideoWrapper>
      <OperationRow>
        <BackToChatBtn variant="contained" onClick={backToChat}>
          Back to chat
        </BackToChatBtn>
        <VideoOperationRow>
          <MuteSelfBtn onClick={toggleSelfMute}>{muteSelf ? <AiOutlineAudioMuted /> : <AiOutlineAudio />}</MuteSelfBtn>
          <CloseCamBtn onClick={toggleCloseCam}>{closeCam ? <FiCameraOff /> : <FiCamera />}</CloseCamBtn>
          <MuteOthersBtn onClick={toggleOthersMute}>
            {muteOthers ? <BsFillVolumeMuteFill /> : <BsFillVolumeUpFill />}
          </MuteOthersBtn>
        </VideoOperationRow>
        <LeaveCallBtn variant="contained" onClick={LeaveVideoChat}>
          Leave
        </LeaveCallBtn>
      </OperationRow>
    </Wrapper>
  )
}

export default VideoContainer

type PeerCellProps = {
  peer: Peer.Instance
  muted: boolean
}

const PeerCell: React.FC<PeerCellProps> = ({ peer, muted = false }) => {
  const ref = useRef() as MutableRefObject<HTMLVideoElement>

  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream
    })
  }, [])

  return <Video playsInline autoPlay ref={ref} muted={muted} />
}

const Wrapper = styled.div`
  display: ${(props: { displayingVideo: boolean }) => (props.displayingVideo ? `flex` : `none`)};
  flex-direction: column;
  overflow-y: auto;
  padding: 8px 32px;
  transition: 0.5s;
  height: calc(100vh - 80px - 100px);

  @media (max-width: ${MEDIA_BREAK}) {
    padding: 12px;
    height: calc(100vh - 80px - 60px);
  }
`

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  grid-gap: 5%;
`

const Video = styled.video`
  background: black;
  width: 47.5%;
  border-radius: 18px;
  margin-bottom: 1%;
  object-fit: cover;

  @media (max-width: ${MEDIA_BREAK}) {
    width: calc(100vw - 24px);
    height: 250px;
  }
`

const OperationRow = styled.div`
  position: sticky;
  bottom: 30px;
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: auto;
  justify-content: space-between;
`

const BackToChatBtn = styled(Button)`
  &.MuiButtonBase-root {
    color: ${({ theme }) => theme.font.contrast};
    background: ${({ theme }) => theme.primary.main};
    &:hover {
      background: ${({ theme }) => theme.primary.shade};
    }
    @media (max-width: ${MEDIA_BREAK}) {
      font-size: 12px;
      padding: 3px 6px;
    }
  }
`

const VideoOperationRow = styled.div`
  display: flex;
  flex-direction: row;
  grid-gap: 5px;
`

const MuteSelfBtn = styled(IconButton)`
  &.MuiButtonBase-root {
    background: ${({ theme }) => theme.primary.main};
    color: ${({ theme }) => theme.font.contrast};
    border-radius: 40%;
    &:hover {
      background: ${({ theme }) => theme.primary.shade};
    }
  }
`

const MuteOthersBtn = styled(IconButton)`
  &.MuiButtonBase-root {
    background: ${({ theme }) => theme.primary.main};
    color: ${({ theme }) => theme.font.contrast};
    border-radius: 40%;
    &:hover {
      background: ${({ theme }) => theme.primary.shade};
    }
  }
`

const CloseCamBtn = styled(IconButton)`
  &.MuiButtonBase-root {
    background: ${({ theme }) => theme.primary.main};
    color: ${({ theme }) => theme.font.contrast};
    border-radius: 40%;
    &:hover {
      background: ${({ theme }) => theme.primary.shade};
    }
  }
`

const LeaveCallBtn = styled(Button)`
  &.MuiButtonBase-root {
    color: ${({ theme }) => theme.font.contrast};
    background: ${({ theme }) => theme.error.main};
    &:hover {
      background: ${({ theme }) => theme.error.shade};
    }
    @media (max-width: ${MEDIA_BREAK}) {
      font-size: 12px;
      padding: 3px 6px;
    }
  }
`
