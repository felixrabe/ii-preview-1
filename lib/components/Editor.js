import D from 'draft-js'
import React from 'react'

const Editor = ({editorState, onChange}) => (
  <div>
    <D.Editor editorState={editorState} onChange={onChange} />
  </div>
)

export default Editor
