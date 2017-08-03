import React from 'react'

import RGL_ from 'react-grid-layout'
const ReactGridLayout = RGL_.WidthProvider(RGL_)

import {cs} from './Colors'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export default class Root extends React.Component {
  render() {
    return (
      <div style={{
        backgroundColor: cs.normalBG,
        fontFamily: 'sans-serif',
        fontSize: '1em',
        height: '100%',
        overflow: 'auto',
      }}>
        <ReactGridLayout
          cols={12}
          draggableCancel='.not-draggable'
          rowHeight={30}
          verticalCompact={true}
        >
          {this.props.children}
        </ReactGridLayout>
      </div>
    )
  }
}
