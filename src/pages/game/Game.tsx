import React from 'react'
import { Container, Grid } from '@mui/material'

const Game = () => {
  return (
    <Container maxWidth='sm'>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={4}>
          Rock
        </Grid>
        <Grid item xs={4}>
          Paper
        </Grid>
        <Grid item xs={4}>
          Scissors
        </Grid>
      </Grid>
    </Container>
  )
}

export default Game
