import { COLOR } from '../components/GlobalStyle'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { LOCATIONS, toPath } from '../Routes'
import { Link } from 'react-router-dom'
import DuplexIcon from '../components/DuplexIcon'

const Onboarding = (): ReactElement => {
  // const history = useHistory()

  // const redirect = () => {
  //   history.push(toPath(LOCATIONS.login))
  // }

  return (
    <Wrapper>
      <Nav>
        <NavItem to={toPath(LOCATIONS.login)} toEnd>
          Sign up
        </NavItem>
        <NavItem to={toPath(LOCATIONS.login)}>Log in</NavItem>
      </Nav>
      <HeroContainer>
        <FlexRow>
          <IconWrapper>
            <DuplexIcon color={COLOR.dark.primary.shade}/>
          </IconWrapper>
          <H1>Duplex</H1>
        </FlexRow>
        <Text>
          Imagine chatting in a spacious place. Not happy
          <br />
          with that? How about having two, or more.
        </Text>
      </HeroContainer>
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
  color: ${({theme})=>theme.font.main};
  padding: 5px;
`

const Text = styled.div`
  color: ${({theme})=>theme.font.main};
  font-size: 16px;
  padding: 5px;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const IconWrapper = styled.div`
  padding: 14px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${COLOR.dark.primary.tint}
`