import React from 'react'

import {colorTable} from '../core/ui/style/Vars'

const Item = (props) => (
  <div className='color-palette-item'
    style={{
      backgroundColor: props.color,
      gridArea: `${props.i}/${props.j}/${props.i + 1}/${props.j + 1}`,
    }}> </div>
)

const Wrapper = (props) => (
  <div style={Object.assign({}, props.style || {}, {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridAutoRows: '1fr',
  })}>
    {props.children}
  </div>
)

export default class ColorPalette extends React.Component {
  render = () => (
    <Wrapper style={this.props.style}>
      {colorTable.map((row, i) =>
        row.map((col, j) =>
          <Item key={col + (i + 1) + (j + 1)} i={i + 1} j={j + 1} color={col} />
        )
      )}
    </Wrapper>
  )
}
