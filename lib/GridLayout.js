import React from 'react'

import RGL_ from 'react-grid-layout'
const ReactGridLayout = RGL_.WidthProvider(RGL_)

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export default class GridLayout extends React.Component {
  render() {
    return (
      <ReactGridLayout
        cols={12}
        draggableCancel='.not-draggable'
        draggableHandle='.draggable'
        rowHeight={30}
        verticalCompact={true}
      >
        {this.props.children}
      </ReactGridLayout>
    )
  }
}
