import React from 'react'
import {connect} from 'react-redux'

const Path = ({path}) => (
  <div>
    Path: {JSON.stringify(path)}
  </div>
)

export default connect(
  state => state,
)(Path)
