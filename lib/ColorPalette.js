import React from 'react'

import {colorTable} from './Theme'

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
          this.renderCol(i + 1, j + 1, col)
        )
      )}
    </Wrapper>
  )

  renderCol = (i, j, col) => {
    return (
      <Item key={col + i + j} i={i} j={j} color={col} />
    )
  }
}
