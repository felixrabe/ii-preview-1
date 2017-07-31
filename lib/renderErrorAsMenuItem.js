import React from 'react'
import * as UI from './UI/index'

export default (error, onClick) => (
  error && (
    <UI.MenuItem error onClick={onClick}>
      {error.toString()}
    </UI.MenuItem>
  )
)
