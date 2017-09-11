await Promise.all([
  (async () => {
    await loadNodeModule('react/umd/react.development', 'react').let('React')
    await loadNodeModule('react-dom/umd/react-dom.development', 'react-dom').let('ReactDOM')
  })(),
  (async () => {
    const jsx = await loadNodeModule('ii-1-web-jsx').let('jsx')
    jsx.register()
  })(),
  loadNodeModule('redux/dist/redux.js', 'redux'),
])

loadNodeModule('react-redux/dist/react-redux.js', 'react-redux')

const App = await loadNodeModule('ii-1-web-react-ui/components/App.jsx')
ReactDOM.render(eval(jsx(`<App />`)), document.getElementById('root'))
