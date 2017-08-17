import React from 'react'
import {connect} from 'react-redux'

import getData from '../selectors/getData'

const Data = ({data}) => (
  <div>
    Data: {JSON.stringify(data)}
  </div>
)

export default connect(
  state => ({
    data: getData(state),
  }),
)(Data)
