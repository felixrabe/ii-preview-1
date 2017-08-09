import React from 'react'

import {ts} from '../ui/style/Vars'

export default class Blue extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: ts.complement[2],
    }
  }

  render = () => (
    <div style={{backgroundColor: this.state.color}} />
  )
}
