import React from 'react'

export default class ObjLayout extends React.Component {
  constructor(props) {
    super(props)

    const child = React.Children.only(this.props.children)

    this.state = {
      child: child,
      objs: this.props.objs,
    }
  }

  renderObjsForChild = () => {
    return this.state.objs.map(o => o[2]).toArray()
  }

  render() {
    return React.cloneElement(
      this.state.child,
      {},
      this.renderObjsForChild(),
    )
  }
}
