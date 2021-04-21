import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core'
import React, { ChangeEvent,  } from 'react'
import styled from 'styled-components'
import { useSettingContext } from '../contexts/SettingContext'

const Appearance: React.FC = () => {
  const settingContext = useSettingContext()
  const theme = settingContext.state.theme
  const updateState = settingContext.updateState

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateState({theme: (event.target as HTMLInputElement).value as 'light' | 'dark'})
  }

  return (
    <Wrapper>
      <FormControl component="fieldset">
        <Label>Theme</Label>
        <RadioGroup aria-label="theme" name="theme" value={theme} onChange={handleChange}>
          <Option value="dark" control={<Radio />} label="Dark" />
          <Option value="light" control={<Radio />} label="Light" />
        </RadioGroup>
      </FormControl>
    </Wrapper>
  )
}

export default Appearance

const Wrapper = styled.div`
  padding: 60px 40px 80px;
  background: ${({theme})=>theme.bg.tint};
  color: ${({theme})=>theme.font.primary};
  transition: 0.1s;
`

const Label = styled(FormLabel)`
  &.MuiFormLabel-root{
    color: ${({theme})=>theme.font.primary};
  }
  &.MuiFormLabel-root.Mui-focused{
    color: ${({theme})=>theme.font.primary};
  }
`

const Option = styled(FormControlLabel)`
  &.MuiFormControlLabel-root > .MuiButtonBase-root{
    color: ${({theme})=>theme.primary.main};
  }
  &.MuiFormControlLabel-root > .MuiButtonBase-root:hover{
    background-color: inherit;
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