import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'

import RGL_ from 'react-grid-layout'
const ReactGridLayout = RGL_.WidthProvider(RGL_)

import {join} from '../../data/DataPath'

import style from './Style'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const Item = (props) => {
  const style = {
    backgroundColor: '#eee',
    cursor: 'default',
    height: '100%',
    userSelect: 'none',
  }
  return (
    <div className='idev-newschool-draggable' style={style}>
      item {props.n}
    </div>
  )
}

export default class NewSchoolView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      canAnimate: false,
      layout: [
        {i: 'item-1', x: 0, y: 0, w: 2, h: 2},
        {i: 'item-2', x: 0, y: 0, w: 2, h: 2},
        {i: 'item-3', x: 0, y: 0, w: 2, h: 2},
      ],
    }

    this.layoutPath = join(this.props.config.dataPath, 'layout')
    this._isMounted = false
  }

  async componentDidMount() {
    setTimeout(() => this.setState({canAnimate: true}), 500)

    const layout = await this.context.dataAccess.get(this.layoutPath)
    this._isMounted = true
    if (layout !== undefined) {
      this.setState({layout})
    }
  }

  componentWillUnmount() {
    this._isMounted = false
    delete this.rgl
  }

  updateWidth() {
    if (!this.rgl) {
      return
    }

    const node = ReactDOM.findDOMNode(this)
    this.rgl.setState({width: node.offsetWidth})
  }

  onLayoutChange = (layout) => {
    if (this._isMounted) {
      this.context.dataAccess.set(this.layoutPath, layout)
    }

    this.updateWidth()
  }

  render() {
    const animateNone = 'idev-newschool-animate-none'
    const addClassName = this.state.canAnimate ? '' : ' ' + animateNone
    return (
      <div className={`idev-newschool${addClassName}`}>
        <style>{style}</style>
        <ReactGridLayout
          cols={12}
          draggableCancel='.idev-newschool-not-draggable'
          draggableHandle='.idev-newschool-draggable'
          layout={this.state.layout}
          margin={[5, 5]}
          onLayoutChange={this.onLayoutChange}
          ref={rgl => this.rgl = rgl}
          rowHeight={30}
          verticalCompact={true}
        >
          <div key='item-1'>
            <Item n='1' />
          </div>
          <div key='item-2'>
            <Item n='2' />
          </div>
          <div key='item-3'>
            <Item n='3' />
          </div>
        </ReactGridLayout>
      </div>
    )
  }
}

NewSchoolView.contextTypes = {
  dataAccess: PropTypes.object.isRequired,
}
