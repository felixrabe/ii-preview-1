import React from 'react'

export default class Repr extends React.Component {
  constructor(props) {
    super(props)
    this._contextObj = this.props.obj
  }

  render() {
    return (
      this._contextObj.renderRepr()
    )
  }
}
