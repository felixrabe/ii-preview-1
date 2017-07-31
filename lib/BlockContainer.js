import React from 'react'
import * as UI from './UI/index'

import './BlockContainer.css'

export default class BlockContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render = () => (
    <UI.Body className='block-container'>
      {this.props.children}
    </UI.Body>
  )
}
