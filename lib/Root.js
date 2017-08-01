import React from 'react'

export default class Root extends React.Component {
  render() {
    return (
      <div style={Object.assign({}, this.props.style || {}, {
        display: 'grid',
        fontFamily: 'sans-serif',
        fontSize: '1.5em',
        gridTemplateAreas: `
          "header"
          "main"
          "footer"
        `,
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'minmax(3em, min-content) 1fr minmax(3em, min-content)',
        height: '100%',
      })}>
        {this.props.children}
      </div>
    )
  }
}
