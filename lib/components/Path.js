import {connect} from 'react-redux'
import React from 'react'

import getPath from '../selectors/getPath'

const Path = ({path}) => (
  <div>Path: {path.join('/')}</div>
)

export default connect(
  state => ({
    path: getPath(state),
  }),
)(Path)
