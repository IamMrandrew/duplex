import React, { ReactElement } from 'react'

type Props = {
  children?: ReactElement
}

const ChatArea = (props: Props): ReactElement => {
  const { children, ...rest } = props
  return (
    <>
      Chat Area View
      {children}
    </>
  )
}

export default ChatArea
