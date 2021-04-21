import React, { ReactElement } from 'react'
import styled from 'styled-components/macro'
import { MdLayers } from 'react-icons/md'
import { FaLayerGroup } from 'react-icons/fa'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { LOCATIONS, toPath } from '../Routes'
import { MEDIA_BREAK } from './Layout'

const NavBar = (): ReactElement => {
  return (
    <Wrapper>
      <Items>
        <Link to={toPath(LOCATIONS.home)}>
          <MdLayers />
        </Link>
        <Link to={toPath(LOCATIONS.home)}>
          <FaLayerGroup />
        </Link>
      </Items>
      <Link to={toPath(LOCATIONS.settings.profile)}>
        <Avatar />
      </Link>
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
  background: ${({ theme }) => theme.bg.tint};
  z-index: 100;
  box-shadow: 3px 0px 2px -2px ${({ theme }) => theme.divider};
  transition: 0.1s;

  @media (max-width: ${MEDIA_BREAK}) {
    display: none;
  }
`

const Items = styled.div`
  & > a > svg {
    display: block;
    color: ${({ theme }) => theme.nav.main};
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;
  }

  & > a:nth-child(1) > svg {
    width: 32px;
    height: 34px;
  }

  & > a:nth-child(2) > svg {
    width: 26px;
    height: 26px;
  }
`
