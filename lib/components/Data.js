import {connect} from 'react-redux'
import React from 'react'

import getData from '../selectors/getData'

const Data = ({data}) => (
  <div>Data: {JSON.stringify(data, null, 2)}</div>
)

export default connect(
  state => ({
    data: getData(state),
  }),
)(Data)
