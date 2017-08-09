import React from 'react'
import PropTypes from 'prop-types'

import {style} from '../ui/style/CSS'
import Dir from './Dir'
import GridLayout from '../ui/grid/GridLayout'
import AsyncStorage from '../storage/AsyncStorage'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dir: null,
      style: style,
    }

    this.storage = new AsyncStorage(localStorage, '$$instadev$$')

    this._isDirInitialized = false
  }

  getChildContext = () => {
    return { storage: this.storage }
  }

  render() {
    return (
      <div className='app'>
        <style>{this.state.style}</style>
        <Dir>
          <GridLayout />
        </Dir>
      </div>
    )
  }
}

App.childContextTypes = {
  storage: PropTypes.object.isRequired,
}
