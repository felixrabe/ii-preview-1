import _ from 'lodash'

import BaseItem from './BaseItem'

export default class TextItem extends BaseItem {
  toJSON() {
    const es = this.editorState
    return _.omit({
      ...this,
      text: es ? es.getCurrentContent().getPlainText() : this.text,
    }, 'editorState')
  }
}
