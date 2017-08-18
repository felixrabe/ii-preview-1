import classNames from 'classnames'
import {connect} from 'react-redux'
import React from 'react'

import actions from '../actions/actions'
import getDir from '../selectors/getDir'
import getModifiedEditor from '../selectors/getModifiedEditor'
import getPath from '../selectors/getPath'

const DirLink = ({isModified, p, onClick}) => (
  <span>
    {' '}
    <span
      className={classNames('ii-dir-link', isModified && 'ii-dir-link-modified')}
      onClick={() => onClick(p)}
      style={{cursor: 'pointer'}}
    >
      {p}
    </span>
  </span>
)

const isModified = (path, modifiedEditor) => {
  if (!modifiedEditor) {
    return false
  }
  const modEditorPath = JSON.parse(modifiedEditor)
  const pathStr = JSON.stringify(path)
  return pathStr === JSON.stringify(modEditorPath.slice(0, path.length))
}

const Dir = ({dir, modifiedEditor, onDirClick, path}) => (
  <div className='ii-dir'>
    {dir.map((p, i) =>
      <DirLink
        isModified={isModified(path.concat(p), modifiedEditor)}
        key={i}
        onClick={p => onDirClick(path, p)}
        p={p}
      />
    )}
  </div>
)

export default connect(
  state => (console.log('Dir:', state), {
    dir: getDir(state),
    modifiedEditor: getModifiedEditor(state),
    path: getPath(state),
  }),
  dispatch => ({
    onDirClick: (path, p) => dispatch(actions.setPath(path.concat(p)))
  }),
)(Dir)
