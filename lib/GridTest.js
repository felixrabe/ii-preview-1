import React from 'react'

import ReactGridLayout from 'react-grid-layout'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export default class GridTest extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2},
    ]
    return (
      <div
        style={Object.assign({}, this.props.style || {}, {
        })}
      >
        <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
          <div className='item' style={{border: '1px solid #666'}} key={'a'}>a</div>
          <div className='item' style={{border: '1px solid #666'}} key={'b'}>b</div>
          <div className='item' style={{border: '1px solid #666'}} key={'c'}>c</div>
        </ReactGridLayout>
      </div>
    )
  }
}
