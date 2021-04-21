import React, { useState, createContext, useContext, ReactElement, MutableRefObject, useRef, Dispatch, SetStateAction } from 'react'
import Peer from 'simple-peer'

type ContextType = {
  peers: Peer.Instance[] | undefined
  userVideo: MutableRefObject<HTMLVideoElement> | undefined
  peersRef: MutableRefObject<any> | undefined
  setPeers: Dispatch<SetStateAction<Peer.Instance[]>> | undefined
}

type Props = {
  children: ReactElement
}

export const PeerContext = createContext<ContextType>({
  peers: undefined,
  userVideo: undefined,
  peersRef: undefined,
  setPeers: () => {},
})

const PeerProvider = ({ children }: Props): ReactElement => {
  const [peers, setPeers] = useState<Peer.Instance[]>([]) // all participants except current user
  const userVideo = useRef() as MutableRefObject<HTMLVideoElement>
  const peersRef = useRef<any[]>([]);

  return (
    <PeerContext.Provider
      value={{
        peers,
        userVideo,
        peersRef,
        setPeers,
      }}
    >
      {children}
    </PeerContext.Provider>
  )
}

export const usePeerContext = (): ContextType => useContext(PeerContext)

export default PeerProvider
