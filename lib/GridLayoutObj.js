import React from 'react'

import Dir from './Dir'

export default class Obj extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='grid-layout-obj frame'>
        {this.props.name}: {this.repr()}
      </div>
    )
  }

  repr() {
    let repr = this.props.children
    if (typeof repr === 'object' && repr instanceof Dir) {
      repr = repr.renderObjsForList()
    }

    return repr
  }
}
