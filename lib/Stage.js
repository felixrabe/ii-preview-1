import React from 'react'

import {cs} from './Colors'

export default class Stage extends React.Component {
  render() {
    return (
      <div style={Object.assign({}, this.props.style || {}, {
        backgroundColor: cs.stageBG,
        display: 'grid',
      })}>
        <div style={{
          alignSelf: 'center',
          color: cs.stageFG,
          fontSize: '6vw',
          textAlign: 'center',
        }}>
          This is the main stage.
        </div>
      </div>
    )
  }
}
