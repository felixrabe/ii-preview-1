import {connect} from 'react-redux'
import React from 'react'

import actions from '../actions/actions'
import getPath from '../selectors/getPath'

const PathLink = ({pp, onClick}) => (
  <span>
    {pp.length > 0 && ' / '}
    <span onClick={() => onClick(pp)} style={{cursor: 'pointer'}}>{
      pp.length ? pp[pp.length - 1] : 'ROOT'
    }</span>
  </span>
)

const Path = ({path, onPathClick}) => (
  <div className='ii-path'>
    <PathLink onClick={onPathClick} pp={[]} />
    {
      path
        .reduce((pp, p) => [...pp, (pp[pp.length - 1] || []).concat(p)], [])
        .map((pp, i) => <PathLink key={i} onClick={onPathClick} pp={pp} />)
    }
  </div>
)

export default connect(
  state => ({
    path: getPath(state),
  }),
  dispatch => ({
    onPathClick: pp => dispatch(actions.setPath(pp))
  }),
)(Path)
