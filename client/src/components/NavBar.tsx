import React, { ReactElement } from 'react'

type Props = {
  children?: ReactElement
}

const NavBar = (props: Props): ReactElement => {
  const { children, ...rest } = props
  return (
    <>
      NavBar
      {children}
    </>
  )
}

export default NavBar
