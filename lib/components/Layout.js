import classNames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'

import RGL_ from 'react-grid-layout'
const ReactGridLayout = RGL_.WidthProvider(RGL_)
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import actions from '../actions/index'
import getCurrentWorld from '../selectors/getCurrentWorld'
import getItemsAsElements from '../selectors/world/getItemsAsElements'

import {spacing} from './Style'

class Layout extends React.Component {
  rgl = null
  state = {initDone: false}

  componentDidMount = () => {
    setTimeout(() => this.setState({initDone: true}), 500)
  }

  componentWillUnmount = () => {
    delete this.rgl
  }

  updateWidth = () => {
    if (!this.rgl) {
      return
    }

    const node = ReactDOM.findDOMNode(this.rgl)
    this.rgl.setState({width: node.offsetWidth})
  }

  onLayoutChange = (layout) => {
    this.updateWidth()
    this.props.onLayoutChange(layout)
  }

  render = () => {
    const className = classNames(
      'ii-layout',
      this.state.initDone === false && 'ii-layout-init',
    )
    return (
      <div className={className}>
        <ReactGridLayout
          cols={12}
          draggableCancel='.ii-layout-not-draggable'
          draggableHandle='.ii-layout-draggable'
          layout={this.props.layout}
          margin={[spacing, spacing]}
          onLayoutChange={this.onLayoutChange}
          ref={rgl_ => this.rgl = rgl_}
          rowHeight={30}
          verticalCompact={true}
        >
          {this.props.items}
        </ReactGridLayout>
      </div>
    )
  }
}

export default connect(
  state => ({
    items: getItemsAsElements(getCurrentWorld(state)),
    layout: getCurrentWorld(state).layout,
  }),
  dispatch => ({
    onLayoutChange: layout => dispatch(actions.setLayout(layout)),
  }),
)(Layout)
