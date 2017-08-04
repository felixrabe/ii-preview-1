import React from 'react'

export default class Repr extends React.Component {
  constructor(props) {
    super(props)
    this._contextObj = this.props.obj
  }

  render() {
    if (this._contextObj.renderRepr) {
      return this._contextObj.renderRepr()
    } else {
      return <div><em>object without representation</em></div>
    }
  }
}
