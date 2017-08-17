import {connect} from 'react-redux'
import React from 'react'

import Data from './Data'
import Dir from './Dir'
import Path from './Path'
import getData from '../selectors/getData'

const Navigator = () => (
  <div>
    <Path />
    <Dir />
    <Data />
  </div>
)

export default Navigator
