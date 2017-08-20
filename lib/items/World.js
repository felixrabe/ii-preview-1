import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'

import RGL_ from 'react-grid-layout'
const ReactGridLayout = RGL_.WidthProvider(RGL_)
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import actions from '../actions/index'
import {spacing} from '../components/Style'
import getWorld from '../selectors/getWorld'
import getItems from '../selectors/world/getItems'

import {padding} from './WorldStyle'

class World extends React.Component {
  rgl = null
  state = {
    rowHeight: 10,
    spacing: spacing / 3,
  }

  componentWillUnmount = () => {
    delete this.rgl
  }

  updateDimensions = () => {
    if (!this.rgl || this._isUpdatingDimensions) {
      return
    }

    this._isUpdatingDimensions = true

    setTimeout(() => {
      const thisNode = ReactDOM.findDOMNode(this)
      const rglNode = ReactDOM.findDOMNode(this.rgl)
      this.rgl.setState({width: rglNode.offsetWidth})
      const maxH = Math.max(...this.props.layout.map(li => li.y + li.h))
      const rowHeight = Math.floor((thisNode.offsetHeight - 3 * padding) / maxH - this.state.spacing)
      this.setState({rowHeight}, () => this._isUpdatingDimensions = false)
    })
  }

  refRgl = (rgl) => {
    this.rgl = rgl
    this.updateDimensions()
  }

  render() {
    this.updateDimensions()

    return (
      <div className='ii-world' onClick={this.props.onClick}>
        <ReactGridLayout
          cols={12}
          layout={this.props.layout}
          margin={[this.state.spacing, this.state.spacing]}
          ref={this.refRgl}
          rowHeight={this.state.rowHeight}
          verticalCompact={false}
        >
          {this.props.items}
        </ReactGridLayout>
      </div>
    )
  }
}

const MiniItem = (props) => (
  <div {...props} className='ii-world-miniitem' />
)

const worldToItems = (world) => (
  getItems(world).map(item => <MiniItem key={item.name} />)
)

const worldToLayout = (world) => (
  world.layout.map(li => ({...li, static: true}))
)

export default connect(
  (state, ownProps) => ({
    items: worldToItems(getWorld(state, ownProps)),
    layout: worldToLayout(getWorld(state, ownProps)),
  }),
  (dispatch, ownProps) => ({
    onClick: () => dispatch(actions.changeWorld(ownProps.item.name)),
  }),
)(World)
