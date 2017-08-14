import DataRepo from './DataRepo'

import {join, split} from './DataPath'

const data = {
  '$$instadev$$_dir': [
    'CustomView',
    'navigator',
  ],
  'CustomView': `
    import React from 'react'

    export default class CustomView extends React.Component {
      render() {
        return (
          <div>
            Custom View!!!
          </div>
        )
      }
    }
  `,
  'devbar': {
    '$$instadev$$_type': 'import:lib/view/devbar/View',
    'selfPath': 'builtin:devbar',
    'viewPath': 'builtin:navigator',
  },
  'navigator': {
    '$$instadev$$_type': 'import:lib/view/navigator/View',
    'root': 'local:',
  },
}

export default class DataRepoBuiltin extends DataRepo {
  // eslint-disable-next-line complexity
  async list(path) {
    const start = path + (path ? '/' : '')
    const keys = Object.keys(data)
      .filter(k => k.startsWith(start))
      .map(k => {
        const ki = k.indexOf('/', start.length)
        return k.slice(start.length, (ki === -1) ? undefined : ki)
      })
      .reduce((keys, k) => {
        keys[k] = true
        return keys
      }, {})

    const keysArray = Object.keys(keys).sort()
    return keysArray.length ? keysArray : undefined
  }

  async get(path) {
    const pp = split(path)
    if (pp[pp.length - 1] === '$$instadev$$_dir') {
      path = join(...pp.slice(0, pp.length - 1))
      return await this.list(path)
    } else {
      return data[path]
    }
  }

  async set(path, value) {
    data[path] = value
  }

  async delete(path) {
    delete data[path]
  }
}
