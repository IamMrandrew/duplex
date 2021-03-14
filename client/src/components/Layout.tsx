import styled from 'styled-components'

export const NAV_WIDTH = 72
export const MIN_MAIN_COL_WIDTH = 480
export const MIN_SECONDARY_COL_WIDTH = 260
export const MAX_SECONDARY_COL_WIDTH = 340

export const MEDIA_BREAK = NAV_WIDTH + MIN_MAIN_COL_WIDTH + MIN_SECONDARY_COL_WIDTH

export const AppLayout = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: ${NAV_WIDTH}px minmax(${MIN_SECONDARY_COL_WIDTH}px, ${MAX_SECONDARY_COL_WIDTH}px) 1fr;
  grid-template-areas: 'navigation secondary main';
  height: 100vh;

  @media (max-width: 767.99px) {
    display: block;
  }
`

/* 
┌──┬────┬───────┐
│xx│ xx │  xx   │
│  │    │       │
│xx│ xx │  xx   │
│  │    │       │
│xx│ xx │  xx   │
└──┴────┴───────┘
*/
