import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'

import RGL_ from 'react-grid-layout'
const ReactGridLayout = RGL_.WidthProvider(RGL_)
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import {spacing} from '../components/Style'
import getWorld from '../selectors/getWorld'
import getItems from '../selectors/world/getItems'

class World extends React.Component {
  rgl = null
  state = {
    rowHeight: 10,
  }

  componentWillUnmount = () => {
    delete this.rgl
  }

  updateDimensions = () => {
    if (!this.rgl) {
      return
    }

    const node = ReactDOM.findDOMNode(this.rgl)
    setTimeout(() => {
      this.rgl.setState({width: node.offsetWidth})
    })
    // this.setState({rowHeight: node.offsetHeight / 20})
  }

  onLayoutChange = (layout) => {
    this.updateDimensions()
  }

  refRgl = (rgl) => {
    this.rgl = rgl
  }

  render() {
    return (
      <div className='ii-world'>
        <ReactGridLayout
          cols={12}
          layout={this.props.layout}
          margin={[spacing/3, spacing/3]}
          onLayoutChange={this.onLayoutChange}
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
    // world: getWorld(state, ownProps),
  }),
  (dispatch, ownProps) => ({
  }),
)(World)
