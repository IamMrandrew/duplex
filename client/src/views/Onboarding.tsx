import { COLOR } from '../components/GlobalStyle'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { LOCATIONS, toPath } from '../Routes'
import { Link } from 'react-router-dom'

type Props = {
  children?: ReactElement
}

const Onboarding = (props: Props): ReactElement => {
  const { children, ...rest } = props
  const history = useHistory()

  const redirect = () => {
    history.push(toPath(LOCATIONS.login))
  }

  return (
    <Wrapper>
      <Nav>
        <NavItem to={toPath(LOCATIONS.login)} toEnd>
          Sign up
        </NavItem>
        <NavItem to={toPath(LOCATIONS.login)}>Log in</NavItem>
      </Nav>
      <HeroContainer>
        <H1>Duplex</H1>
        <Text>
          Imagine chatting in a spacious place. Not happy
          <br />
          with that? How about having two, or more.
        </Text>
      </HeroContainer>
      {children}
    </Wrapper>
  )
}

export default Onboarding

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: ;
`

const Nav = styled.div`
  display: flex;
  flex-direction: row;
`

type NavItemProps = {
  toEnd?: boolean
}

const NavItem = styled(Link)`
  cursor: pointer;
  padding: 5px 10px 5px 10px;
  margin-left: ${(props: NavItemProps) => (props.toEnd ? `auto` : `none`)};
`

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  padding-left: 10%;
`

const H1 = styled.h1`
  font-size: 2em;
  color: ${COLOR.font.grey};
  padding: 5px;
`

const Text = styled.div`
  color: ${COLOR.font.grey};
  font-size: 16px;
  padding: 5px;
`
