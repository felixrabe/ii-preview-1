import DataRepo from './DataRepo'

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
  'navigator': {
    '$$instadev$$_type': 'import:lib/view/navigator/View',
    'root': 'builtin:',
  },
}

export default class DataRepoBuiltin extends DataRepo {
  async get(path) {
    return data[path]
  }

  async set(path, value) {
    data[path] = value
  }
}
