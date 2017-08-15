import React from 'react'

import {styleObj} from './LoadingStyle'

export default class Loading extends React.Component {
  render() {
    return (
      <div style={styleObj.outer}>
        <div style={styleObj.inner}>
          Loading...
        </div>
      </div>
    )
  }
}
