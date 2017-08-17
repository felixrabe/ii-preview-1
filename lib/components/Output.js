import React from 'react'
import {connect} from 'react-redux'

import getOutput from '../selectors/getOutput'

const Output = ({output}) => (
  <div>
    Output: {JSON.stringify(output)}
  </div>
)

export default connect(
  state => (console.log('connected output'), {
    output: getOutput(state),
  }),
)(Output)
