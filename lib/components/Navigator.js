import {connect} from 'react-redux'
import React from 'react'

import getData from '../selectors/getData'
import getPath from '../selectors/getPath'

const Navigator = ({path, data}) => (
  <div>
    <div>Navigator</div>
    <div>Path: {path.join('/')}</div>
    <div>Data: {JSON.stringify(data, null, 2)}</div>
  </div>
)

export default connect(
  state => ({
    data: getData(state),
    path: getPath(state),
  }),
)(Navigator)
