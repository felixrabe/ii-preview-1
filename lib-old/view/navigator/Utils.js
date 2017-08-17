import D from 'draft-js'

export const cl = (...nn) =>
  ({className: nn.map(n => 'ii-navigator-' + n).join(' ')})

export const newEditorStateFromText = (text) => {
  const content = D.ContentState.createFromText(text)
  const editorState = D.EditorState.createWithContent(content)
  return D.EditorState.moveSelectionToEnd(editorState)
}

export const stateFromData = (data) => {
  let text = ''
  if (typeof data !== 'undefined') {
    if (typeof data === 'string') {
      text = data
    } else {
      text = JSON.stringify(data, null, 2)
    }
  }

  const editorState = newEditorStateFromText(text)
  return {data, text, editorState}
}
