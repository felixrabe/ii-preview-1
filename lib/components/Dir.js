import {connect} from 'react-redux'
import React from 'react'

import actions from '../actions/actions'
import getDir from '../selectors/getDir'
import getPath from '../selectors/getPath'

const DirLink = ({p, onClick}) => (
  <span>
    {' '}
    <span onClick={() => onClick(p)} style={{cursor: 'pointer'}}>
      {p}
    </span>
  </span>
)

const Dir = ({dir, path, onDirClick}) => (
  <div>
    Dir: {dir.map((p, i) =>
      <DirLink key={i} onClick={p => onDirClick(path, p)} p={p} />
    )}
  </div>
)

export default connect(
  state => ({
    dir: getDir(state),
    path: getPath(state),
  }),
  dispatch => ({
    onDirClick: (path, p) => dispatch(actions.setPath(path.concat(p)))
  }),
)(Dir)
