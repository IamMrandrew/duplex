import React, { ReactElement } from 'react'
import styled from 'styled-components/macro'
import { MdLayers } from 'react-icons/md'
import { FaLayerGroup } from 'react-icons/fa'
import { Avatar } from '@material-ui/core'
import { COLOR } from './GlobalStyle'

type Props = {
  children?: ReactElement
}

const NavBar = (props: Props): ReactElement => {
  const { children, ...rest } = props
  return (
    <Wrapper>
      <Items>
        <MdLayers />
        <FaLayerGroup />
      </Items>
      <Avatar />
    </Wrapper>
  )
}

export default NavBar

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 160px;
  padding-bottom: 30px;

  @media (max-width: 767.99px) {
    display: none;
  }
`

const Items = styled.div`
  & > svg {
    display: block;
    color: ${COLOR.primary.shaded};
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;
  }

  & > svg:nth-child(1) {
    width: 32px;
    height: 34px;
  }

  & > svg:nth-child(2) {
    width: 26px;
    height: 26px;
  }
`
