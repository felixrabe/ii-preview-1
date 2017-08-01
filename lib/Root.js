import React from 'react'

export default class Root extends React.Component {
  render() {
    return (
      <div style={Object.assign({}, this.props.style || {}, {
        fontFamily: 'sans-serif',
        fontSize: '1.2em',
        height: '100%',
        overflow: 'auto',
      })}>
        {this.props.children}
      </div>
    )
  }
}
