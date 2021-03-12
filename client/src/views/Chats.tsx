import React, { ReactElement } from 'react'

type Props = {
  children?: ReactElement
}

const Chats = (props: Props): ReactElement => {
  const { children, ...rest } = props
  return (
    <>
      Chats view
      {children}
    </>
  )
}

export default Chats
