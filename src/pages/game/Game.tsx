import React from 'react'
import { Container, Grid } from '@mui/material'

const Game = () => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent='center'
      alignItems='center'
      style={{ height: '100%' }}
    >
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
  )
}

export default Game
