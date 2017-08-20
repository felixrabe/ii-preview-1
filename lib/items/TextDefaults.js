import _ from 'lodash'

class TextItem {
  constructor(item) {
    Object.assign(this, item)
  }

  toJSON() {
    const es = this.editorState
    return _.omit({
      ...this,
      text: es ? es.getCurrentContent().getPlainText() : this.text,
    }, 'editorState')
  }
}

export default new TextItem()
