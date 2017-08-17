import {connect} from 'react-redux'
import React from 'react'

import actions from '../actions/actions'
import getModifiedEditor from '../selectors/getModifiedEditor'
import getPath from '../selectors/getPath'
import getPathStr from '../selectors/getPathStr'

const PathLink = ({isModified, pp, onClick}) => (
  <span>
    {pp.length > 0 && ' / '}
    <span
      className={'ii-path-link' + (isModified ? ' ii-path-link-modified' : '')}
      onClick={() => onClick(pp)}
      style={{cursor: 'pointer'}}
    >
      {pp.length ? pp[pp.length - 1] : 'ROOT'}
    </span>
  </span>
)

const Path = ({path, modifiedEditor, onPathClick}) => (
  <div className='ii-path'>
    <PathLink
      isModified={JSON.stringify([]) === modifiedEditor}
      onClick={onPathClick}
      pp={[]}
    />
    {
      path
        .reduce((pp, p) => [...pp, (pp[pp.length - 1] || []).concat(p)], [])
        .map((pp, i) => (
          <PathLink
            key={i}
            isModified={JSON.stringify(pp) === modifiedEditor}
            onClick={onPathClick}
            pp={pp}
          />
        ))
    }
  </div>
)

export default connect(
  state => ({
    modifiedEditor: getModifiedEditor(state),
    path: getPath(state),
  }),
  dispatch => ({
    onPathClick: pp => dispatch(actions.setPath(pp))
  }),
)(Path)
