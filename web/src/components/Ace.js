import brace from 'brace'
import 'brace/mode/javascript'
import 'brace/theme/github'
import React from 'react'
import AceEditor from 'react-ace'

function onChange(newValue) {
  console.log('change', newValue)
}

const Ace = ({inBrowser}) => (
  <AceEditor
    mode="javascript"
    theme="github"
    onChange={onChange}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{$blockScrolling: true}}
  />
)

export const __useDefault = Ace
export default __useDefault
