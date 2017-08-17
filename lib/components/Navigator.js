import {connect} from 'react-redux'
import React from 'react'

import Data from './Data'
import Path from './Path'
import getData from '../selectors/getData'

const Navigator = () => (
  <div>
    <Path />
    <Data />
  </div>
)

export default Navigator
