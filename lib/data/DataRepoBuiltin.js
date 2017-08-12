import DataRepo from './DataRepo'

export default class DataRepoBuiltin extends DataRepo {
  async get(path) {
    return ({
      '$$instadev$$_dir': [
        'CustomView',
        'hello',
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
      'plainView': {
        '$$instadev$$_type': 'import:lib/view/plain/View',
        // '$$instadev$$_type': 'import:$$dataAccess$$/CustomView',
        'root': 'builtin:/',
      },
      'readme': 'Some introductory material maybe?',
    })[path]
  }
}
