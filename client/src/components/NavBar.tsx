import React, { ReactElement } from 'react'
import styled from 'styled-components/macro'
import { MdLayers } from 'react-icons/md'
import { FaLayerGroup } from 'react-icons/fa'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { LOCATIONS, toPath } from '../Routes'
import { MEDIA_BREAK } from './Layout'
// import DuplexIcon from './DuplexIcon'
import DuplexIcon from '../assets/duplex-icon.svg'
import { COLOR } from './GlobalStyle'
import { useSettingContext } from '../contexts/SettingContext'

type Props = {
  showNav: boolean
  setShowNav: any
}

const NavBar: React.FC<Props> = ({ showNav, setShowNav }) => {
  const { theme } = useSettingContext().state

  return (
    <Wrapper showNav={showNav}>
      <Items>
        <Link to={toPath(LOCATIONS.home)} onClick={() => setShowNav((prev: any) => !prev)}>
          {/* <DuplexIcon color={theme === 'dark' ? COLOR.dark.primary.shade : COLOR.light.primary.shade} /> */}
          <Icon src={DuplexIcon} />
        </Link>
        <Link to={toPath(LOCATIONS.home)} onClick={() => setShowNav((prev: any) => !prev)}>
          <MdLayers />
        </Link>
        <Link to={'/conversation'} onClick={() => setShowNav((prev: any) => !prev)}>
          <FaLayerGroup />
        </Link>
      </Items>
      <Link to={toPath(LOCATIONS.settings.root)} onClick={() => setShowNav((prev: any) => !prev)}>
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
  padding-top: 40px;
  padding-bottom: 30px;
  background: ${({ theme }) => theme.bg.tint};
  z-index: 100;
  box-shadow: 3px 0px 2px -2px ${({ theme }) => theme.divider};
  transition: 0.1s;

  @media (max-width: ${MEDIA_BREAK}) {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 85px;
    transform: ${(props: { showNav: boolean }) => (props.showNav ? 'translateX(0)' : 'translateX(-100%)')};
    transition: all 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
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

  & > a:nth-child(2) > svg {
    width: 32px;
    height: 34px;
  }

  & > a:nth-child(3) > svg {
    width: 26px;
    height: 26px;
  }
`

const Icon = styled.img`
  margin-bottom: 80px;
`
