import React from 'react'
import Game from './pages/game/Game'
import { Container, styled } from '@mui/material'

const Page = styled('div')({
  height: '100%',
  width: '100%'
})

function App() {
  return (
    <Container maxWidth='sm' style={{ height: '100%' }}>
      <Page>
        <Game />
      </Page>
    </Container>
  )
}

export default App
