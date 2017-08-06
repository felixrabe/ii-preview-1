import React from 'react'
import ReactDOM from 'react-dom'

import RGL_ from 'react-grid-layout'
const ReactGridLayout = RGL_.WidthProvider(RGL_)

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export default class GridLayout extends React.Component {
  componentWillUnmount() {
    delete this.rgl
  }

  updateWidth() {
    if (!this.rgl) {
      return
    }

    const node = ReactDOM.findDOMNode(this)
    this.rgl.setState({width: node.offsetWidth})
  }

  onLayoutChange = () => {
    this.updateWidth()
  }

  render() {
    return (
      <ReactGridLayout
        cols={12}
        draggableCancel='.not-draggable'
        draggableHandle='.draggable'
        onLayoutChange={this.onLayoutChange}
        ref={rgl => this.rgl = rgl}
        rowHeight={30}
        verticalCompact={true}
      >
        {this.props.children}
      </ReactGridLayout>
    )
  }
}
