import classNames from 'classnames'
import D from 'draft-js'
import React from 'react'
import {connect} from 'react-redux'

import actions from '../actions/actions'
import getEditorState from '../selectors/getEditorState'
import getIsReadOnly from '../selectors/getIsReadOnly'
import getPath from '../selectors/getPath'

const keyBinding = (ev) => {
  if (ev.key === 's' && D.KeyBindingUtil.hasCommandModifier(ev)) {
    return 'ii-save'
  }
  return D.getDefaultKeyBinding(ev)
}

const handleKeyCommand = (command) => {
  switch (command) {
  case 'ii-save':
    console.log('save')
    return 'handled'
  default:
    return 'not-handled'
  }
}

const Data = ({path, editorState, onChange, readOnly}) => (
  <div className={classNames('ii-data', readOnly && 'ii-data-readonly')}>
    <D.Editor
      editorState={editorState}
      handleKeyCommand={handleKeyCommand}
      keyBindingFn={keyBinding}
      onChange={editorState => onChange(path, editorState)}
      readOnly={readOnly}
    />
  </div>
)

export default connect(
  state => ({
    editorState: getEditorState(state),
    path: getPath(state),
    readOnly: getIsReadOnly(state),
  }),
  dispatch => ({
    onChange: (path, editorState) => dispatch(actions.updateEditor(path, editorState)),
  }),
)(Data)
