import React, { ReactElement } from 'react'
import styled from 'styled-components/macro'
import { LOCATIONS, toPath } from '../Routes'
import { Link } from 'react-router-dom'
import { Container } from '@material-ui/core'
import DuplexIcon from '../assets/duplex-icon.svg'

const Onboarding = (): ReactElement => {
  return (
    <Wrapper>
      <Nav>
        <CustomContainer>
          <Icon src={DuplexIcon} />
          <NavItems>
            <NavItem to={toPath(LOCATIONS.signup)} $toEnd>
              Sign up
            </NavItem>
            <NavItem to={toPath(LOCATIONS.login)}>Log in</NavItem>
          </NavItems>
        </CustomContainer>
      </Nav>
      <HeroContainer>
        <TextWrapper>
          <H1>Duplex</H1>
          <Text>
            Imagine chatting in a spacious place. Not happy
            <br />
            with that? How about having two, or more.
          </Text>
          <Button to={toPath(LOCATIONS.login)}>Discover your spaces now</Button>
        </TextWrapper>
      </HeroContainer>
      <Footer></Footer>
    </Wrapper>
  )
}

export default Onboarding

const Wrapper = styled.div`
  width: 100%;
`

const Nav = styled.div`
  height: 80px;
  box-shadow: 0 3px 2px -2px ${({ theme }) => theme.divider};
`

type NavItemProps = {
  $toEnd?: boolean
}

const NavItems = styled.div``

const NavItem = styled(Link)`
  cursor: pointer;
  color: ${({ theme }) => theme.primary.shade};
  font-weight: 500;
  padding: 5px 10px 5px 10px;
  margin-left: ${(props: NavItemProps) => (props.$toEnd ? `auto` : `none`)};
`

const CustomContainer = styled(Container)`
  max-width: 992px;
  padding: 0px 20px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const HeroContainer = styled(Container)`
  display: flex !important;
  align-items: center;
  max-width: 992px;
  padding: 0px 20px;
  margin-left: auto;
  margin-right: auto;
  height: calc(100vh - 80px - 30vh);
`

const TextWrapper = styled.div``

const H1 = styled.h1`
  font-size: 60px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary.shade};
  margin-bottom: 10px;
`

const Text = styled.div`
  color: ${({ theme }) => theme.primary.shade};
  font-size: 16px;
  line-height: 130%;
  padding: 5px;
`

const Icon = styled.img``

const Button = styled(Link)`
  display: block;
  padding: 12px 15px;
  background-color: ${({ theme }) => theme.primary.main};
  border: none;
  outline: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  margin-top: 30px;
  color: white;
  max-width: 260px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
`

const Footer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.primary.main};
  height: 30vh;
`
