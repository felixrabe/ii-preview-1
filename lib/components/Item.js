import classNames from 'classnames'
import _ from 'lodash'
import React from 'react'

const innerClassName = classNames('ii-layout-item-inner')
const outerClassName = classNames('ii-layout-item-outer')

export default class Item extends React.Component {
  componentWillMount() {
    this.loadItem(null)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.item === nextProps.item) {
      return
    }
    this.loadItem(nextProps)
  }

  async loadItem(props) {
    const tpi = this.props.item
    const pi = props ? props.item : tpi
    let T
    if (!props || !this.state.item || tpi.type !== pi.type) {
      this.setState({item: null})
      // await new Promise(res => setTimeout(() => res(), 1000))
      T = (await SystemJS.import(`lib/items/${pi.type}`)).default
    } else {
      T = this.state.item.type
    }
    this.setState({item: <T item={pi} />})
  }

  render() {
    const props = _.omit(this.props, 'item')
    const headerClassName = classNames(
      'ii-layout-item-header',
      !this.props.item.static && 'ii-layout-draggable',
    )
    return (
      <div {...props} className={outerClassName}>
        <div className={headerClassName}>
          {this.props.item.name}
        </div>
        <div className={innerClassName}>
          {this.state.item || 'Loading...'}
        </div>
        {props.children}
      </div>
    )
  }
}