import React from 'react'

import RGL_ from 'react-grid-layout'
const ReactGridLayout = RGL_.WidthProvider(RGL_)

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export default class Root extends React.Component {
  render() {
    return (
      <div style={{
        fontFamily: 'sans-serif',
        fontSize: '1.2em',
        height: '100%',
        overflow: 'auto',
      }}>
        <ReactGridLayout
          cols={12}
          draggableCancel='.not-draggable'
          rowHeight={30}
          verticalCompact={false}
        >
          {this.props.children}
        </ReactGridLayout>
      </div>
    )
  }
}
