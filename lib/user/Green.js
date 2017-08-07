import React from 'react'

import {ts} from '../core/StyleVars'

export default class Green extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: ts.good[2],
    }
  }

  render = () => (
    <div style={{backgroundColor: this.state.color}} />
  )
}