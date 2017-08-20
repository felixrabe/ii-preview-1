import classNames from 'classnames'
import _ from 'lodash'
import React from 'react'

const innerClassName = classNames('ii-layout-item-inner')
const outerClassName = classNames('ii-layout-item-outer')

export default class Item extends React.Component {
  state = {item: null}

  componentDidMount() {
    this.loadItem(null)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.item === nextProps.item) {
      return
    }
    if (_.toPairs(nextProps.item).every(([k, v]) => this.props.item[k] === v)) {
      return
    }
    this.loadItem(nextProps)
  }

  componentWillUnmount() {
    this._isUnmounted = true
  }

  async loadItem(props) {
    const tpi = this.props.item
    const pi = props ? props.item : tpi
    let T
    if (!props || !this.state.item || tpi.type !== pi.type) {
      this.setState({item: null})
      // await new Promise(res => setTimeout(() => res(), 1000))
      T = (await SystemJS.import(`lib/items/${pi.type}`)).default
      if (this._isUnmounted) {
        return
      }
    } else {
      T = this.state.item.type
    }
    this.setState({item: <T item={pi} />})
  }

  render() {
    const props = _.omit(this.props, 'item')
    const item = this.props.item
    const headerClassName = classNames(
      'ii-layout-item-header',
      !item.static && 'ii-layout-draggable',
    )
    return (
      <div {...props} className={outerClassName}>
        <div className={headerClassName}>
          {item.name} ({item.type})
        </div>
        <div className={innerClassName}>
          {this.state.item || 'Loading...'}
        </div>
        {props.children}
      </div>
    )
  }
}
