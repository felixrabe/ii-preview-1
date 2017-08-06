import React from 'react'

import {ts} from '../core/StyleVars'

export default class Red extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: ts.bad[2],
    }
  }

  render = () => (
    <div style={{backgroundColor: this.state.color}} />
  )
}
