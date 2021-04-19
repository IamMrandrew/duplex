import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { toPath } from '../Routes'

type Props = {
  path?: string
  isActive: boolean
}

const Option: React.FC<Props> = ({ path, isActive }) => {
  const toTitleCase = (string: string) => {
    const tmp = string.replace(/([A-Z])/g, ' $1')
    return tmp.charAt(0).toUpperCase() + tmp.slice(1)
  }

  return (
    <LinkWrapper to={toPath(path || '')}>
      <Item isActive={isActive}>{toTitleCase(path?.replace("settings/", "") || '')}</Item>
    </LinkWrapper>
  )
}

export default Option

const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: inherit;
`
type ItemProps = {
  isActive: boolean
  theme?: any
}

const Item = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 18px;
  text-align: center;
  background: ${(props: ItemProps) => (props.isActive ? props.theme.bg.tint : props.theme.bg.main)};
  color: ${({theme}) => (theme.font.primary)};
  padding: 14px 7px;
  margin: 5px 0 5px 0;
  transition: 0s;
  border-radius: 5px;
  &:hover {
    background: ${({theme}) => theme.bg.tint};
  }
`
