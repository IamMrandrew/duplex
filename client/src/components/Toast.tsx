import React from 'react'
import styled from 'styled-components/macro'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

type Props = {
  show: boolean
  setShow: any
  message: string
  duration: number
  variant: 'error' | 'info' | 'success' | 'warning'
}

const Toast: React.FC<Props> = ({ show, setShow, message, duration, variant }) => {
  return (
    <>
      <Wrapper>
        <Snackbar
          open={show}
          autoHideDuration={duration}
          onClose={() => {
            setShow(false)
          }}
        >
          <Alert severity={variant}>
            <Details>{message}</Details>
          </Alert>
        </Snackbar>
      </Wrapper>
    </>
  )
}

export default Toast

const Wrapper = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  z-index: 1000;
  width: 100%;
  transform: translate(-50%, 50%);
  padding: 5px 10px 5px 10px;
  pointer-events: none;
  transition: all 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
`

const Details = styled.div`
  margin: 0 0 5px 0;
  color: ${({ theme }) => theme.font.primary};
`
