((SystemJS) => {
  'use strict'

  const pluginPath = 'node_modules/systemjs-plugin-babel'
  SystemJS.config({
    map: {
      'plugin-babel': pluginPath + '/plugin-babel.js',
      'systemjs-babel-build': pluginPath + '/systemjs-babel-browser.js',
    },
    packages: {
      '': {
        defaultExtension: 'js',
        format: 'esm',
        meta: {
          '*.js': {
            loader: 'plugin-babel',
            babelOptions: {
              es2015: false,
              plugins: [
              ],
            },
          },
        },
      },
      'node_modules': {},
    },
    transpiler: 'plugin-babel',
  })
})(typeof SystemJS !== 'undefined' ? SystemJS : require('systemjs'))
