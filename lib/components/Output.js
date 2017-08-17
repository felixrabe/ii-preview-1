import React from 'react'
import {connect} from 'react-redux'

import getOutput from '../selectors/getOutput'

const Output = ({output}) => (
  <div>
    Output: {JSON.stringify(output)}
  </div>
)

export default connect(
  state => ({
    output: getOutput(state),
  }),
)(Output)
