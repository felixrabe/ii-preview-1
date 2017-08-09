import React from 'react'
import I from 'immutable'
import PropTypes from 'prop-types'

import {style} from '../ui/style/CSS'
import GridLayout from '../ui/grid/GridLayout'
import AsyncStorage from '../storage/AsyncStorage'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      objs: new I.OrderedMap({app: this}),  // k: [v, ...]
      style: style,
    }

    this.state.dir = new Dir({objs: this.state.objs, onChange: objs => this.setState(objs)})

    this.storage = new AsyncStorage(localStorage, '$$instadev$$')
  }

  getChildContext = () => {
    return { storage: this.storage }
  }

  render() {
    return (
      <div className='app'>
        <style>{this.state.style}</style>
        <ObjLayout objs={this.state.objs}>
          <GridLayout />
        </ObjLayout>
      </div>
    )
  }
}

App.childContextTypes = {
  storage: PropTypes.object.isRequired,
}
