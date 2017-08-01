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
        // eslint-disable-next-line max-len
        gridTemplateRows: 'minmax(2em, min-content) 1fr minmax(2em, min-content)',
        height: '100%',
      })}>
        {this.props.children}
      </div>
    )
  }
}
