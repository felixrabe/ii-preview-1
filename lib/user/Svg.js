import React from 'react'

import {ts} from '../ui/style/Vars'

export default class Svg extends React.Component {
  constructor(props) {
    super(props)
    this.elem = undefined
  }

  render() {
    return (
      <svg
        ref={e => this.elem = e}
        xmlns='http://www.w3.org/2000/svg'
        width='100%' height='100%'
      >
        <circle cx='50%' cy='50%' r='30%' fill={ts.primary[2]} />
      </svg>
    )
  }
}
