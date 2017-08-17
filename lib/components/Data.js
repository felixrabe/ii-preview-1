import D from 'draft-js'
import React from 'react'
import {connect} from 'react-redux'

import getEditorState from '../selectors/getEditorState'

// {JSON.stringify(data, null, 2)}

const Data = ({editorState, onChange}) => (
  <div className='ii-data'>
    <D.Editor
      editorState={editorState}
      onChange={onChange}
    />
  </div>
)

export default connect(
  state => ({
    editorState: getEditorState(state),
  }),
  dispatch => ({
    onChange: () => 0,
  }),
)(Data)
