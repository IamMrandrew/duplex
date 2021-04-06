import { useState, useEffect, ReactElement } from 'react'

export const useResponsive = () => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })

  const isMobile = () => {
    return dimensions.width <= 768
  }

  return { dimensions, setDimensions, isMobile }
}
