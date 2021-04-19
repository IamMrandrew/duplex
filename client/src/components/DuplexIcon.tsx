import styled, { keyframes } from 'styled-components'



type Props={
    withAnimation?: boolean
    size?: 'small' | 'medium' | 'large'
    color: string
}

const DuplexIcon: React.FC<Props> = ({ withAnimation, size = 'small', color }) => {
  
    const getActualSize = () => {
        if(size === 'small') return {width: "40px", height: "40px"}
        if(size === 'medium') return {width: "80px", height: "80px"}
        return {width: "", height: ""}
    }

  return (
    <Wrapper style={getActualSize()}>
        <Rect color={color}/>
        <Square color={color}/>
        <Square isLower color={color}/>
        <Rect isLower color={color}/>
    </Wrapper>
  )
}

export default DuplexIcon


// will make an animation on the icon
// const animation = keyframes`
//   0% {
//     top: 72px;
//     left: 72px;
//     width: 0;
//     height: 0;
//     opacity: 1;
//   }

//   100% {
//     top: 0px;
//     left: 0px;
//     width: 144px;
//     height: 144px;
//     opacity: 0;
//   }
// `

const Wrapper = styled.div`
  position: relative;
  z-index: 100;
`

type IconProps = {
    isLower?: boolean
    color: string
}

const Rect = styled.div`
  position: absolute;
  background: ${(props: IconProps)=>props.color};
  height: 30%;
  width: 100%;
  ${(props: IconProps)=>props.isLower?`
    bottom: 0;
  `:``}
`

const Square = styled.div`
  position: absolute;
  background: ${(props: IconProps)=>props.color};
  width: 45%;
  height: 35%;
  top: 30%;
  ${(props: IconProps)=>props.isLower?`
    top: 35%;
    right: 0;
  `:``}
`