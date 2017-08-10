import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import RGL_ from 'react-grid-layout'
const ReactGridLayout = RGL_.WidthProvider(RGL_)

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export default class Layout extends React.Component {
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

  onLayoutChange = (layout) => {
    this.layout = layout
    this.updateWidth()
  }

  getLayoutData = () => {
    return this.layout
  }

  setLayoutData = (layout) => {
    this.rgl.setState({layout: layout})
  }

  render() {
    return (
      <ReactGridLayout
        className='core-layout'
        cols={12}
        draggableCancel='.core-not-draggable'
        draggableHandle='.core-draggable'
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

Layout.contextTypes = {
  storage: PropTypes.object.isRequired,
}
