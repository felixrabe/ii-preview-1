import _ from 'lodash'

// TODO: turn into TextDefaults

export default class TextItem {
  constructor(item) {
    Object.assign(this, item)
  }

  toJSON() {
    const es = this.editorState
    return _.omit({
      ...this,
      text: es ? es.getCurrentContent().getPlainText() : '',
    }, 'editorState')
  }
}
