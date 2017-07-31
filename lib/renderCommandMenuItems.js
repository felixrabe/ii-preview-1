import React from 'react'
import * as UI from './UI/index'

export default (commands, cb) => (
  commands.map(([command, label]) => (
    <UI.MenuItem
      key={command}
      onClick={() => cb(command)}
    >
      {label}
    </UI.MenuItem>
  ))
)
