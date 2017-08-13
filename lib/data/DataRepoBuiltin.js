import DataRepo from './DataRepo'

const data = {
  '$$instadev$$_dir': [
    'CustomView',
    'hello',
    'multiView',
    'plainView',
    'readme',
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
  'hello/$$instadev$$_dir': [
    'world',
    'you',
  ],
  'hello/world': {
    '$$instadev$$_type': 'text',
  },
  'hello/you': {
    '$$instadev$$_type': 'code',
  },
  'multiView/$$instadev$$_dir': [
    'plain',
    'custom',
    'navigator',
  ],
  'multiView': {
    '$$instadev$$_type': 'import:lib/view/multi/View',
    'children': [
      'multiView/plain',
      'multiView/navigator',
    ],
    'style': {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: '100%',
      height: '100%',
    },
  },
  'multiView/plain': {
    '$$instadev$$_type': 'import:lib/view/plain/View',
    'root': 'builtin:',
  },
  'multiView/custom': {
    '$$instadev$$_type': 'import:$$dataAccess$$/CustomView',
  },
  'multiView/navigator': {
    '$$instadev$$_type': 'import:lib/view/navigator/View',
    'root': 'builtin:',
  },
  'plainView': {
    '$$instadev$$_type': 'import:lib/view/plain/View',
    'root': 'builtin:',
  },
  'readme': 'Some introductory material maybe?',
}

export default class DataRepoBuiltin extends DataRepo {
  async get(path) {
    return data[path]
  }

  async set(path, value) {
    data[path] = value
  }
}
