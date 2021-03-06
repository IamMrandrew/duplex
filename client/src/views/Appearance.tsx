import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core'
import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import { useResponsive } from '../hooks/useResponsive'
import { useSettingContext } from '../contexts/SettingContext'
import { FaChevronLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Appearance: React.FC = () => {
  const settingContext = useSettingContext()
  const theme = settingContext.state.theme
  const updateState = settingContext.updateState
  const { isMobile } = useResponsive()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateState({ theme: (event.target as HTMLInputElement).value as 'light' | 'dark' })
    document.cookie = `theme_mode=${(event.target as HTMLInputElement).value};path=/`
  }

  return (
    <Wrapper>
      <Header>
        {isMobile() && (
          <BackButton to={'/settings'}>
            <FaChevronLeft />
          </BackButton>
        )}
        <Title>Appearance</Title>
      </Header>
      <Content>
        <FormControl component="fieldset">
          <Label>Theme</Label>
          <RadioGroup aria-label="theme" name="theme" value={theme} onChange={handleChange}>
            <Option value="dark" control={<Radio />} label="Dark" />
            <Option value="light" control={<Radio />} label="Light" />
          </RadioGroup>
        </FormControl>
      </Content>
    </Wrapper>
  )
}

export default Appearance

const Wrapper = styled.div`
  background: ${({ theme }) => theme.bg.tint};
  color: ${({ theme }) => theme.font.primary};
  transition: 0.1s;
  height: 100vh;
`

const Content = styled.div`
  padding: 0px 32px;
  padding-top: 48px;
`

const Label = styled(FormLabel)`
  &.MuiFormLabel-root {
    color: ${({ theme }) => theme.font.primary};
  }
  &.MuiFormLabel-root.Mui-focused {
    color: ${({ theme }) => theme.font.primary};
  }
`

const Option = styled(FormControlLabel)`
  &.MuiFormControlLabel-root > .MuiButtonBase-root {
    color: ${({ theme }) => theme.primary.main};
  }
  &.MuiFormControlLabel-root > .MuiButtonBase-root:hover {
    background-color: inherit;
  }
`

const Header = styled.div`
  padding: 32px;
  padding-top: 40px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.bg.tint};
  box-shadow: 0 3px 2px -2px ${({ theme }) => theme.divider};
`

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.font.primary};
`

const BackButton = styled(Link)`
  background: none;
  border: none;
  outline: none;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;

  > svg {
    color: ${({ theme }) => theme.font.primary};
    font-size: 18px;
  }
`
// const Option = styled(Radio)`
//   &.MuiButtonBase-root {
//     color: ${COLOR.primary.main};
//   }
//   &.MuiIconButton-label {
//     color: ${COLOR.primary.main};
//   }
// `
