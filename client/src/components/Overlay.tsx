import React from 'react'
import styled from 'styled-components/macro'

type Props = {
  showModal: boolean
  setShowModal: any
}

const Overlay: React.FC<Props> = ({ showModal, setShowModal }) => {
  return <Wrapper showModal={showModal} onClick={() => setShowModal(!showModal)}></Wrapper>
}

export default Overlay

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 700;
  background-color: rgba(100, 100, 100, 0.5);
  opacity: ${(props: { showModal: boolean }) => (props.showModal ? '100%' : '0%')};
  pointer-events: ${(props: { showModal: boolean }) => (props.showModal ? 'all' : 'none')};
  transition: all 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
`
