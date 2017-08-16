import React from 'react'

const dispatcher = (state = {lastId: 0, list: []}, action) => {
  switch (action) {
  case 'add':
    const id = state.lastId + 1
    return Object.assign({}, state, {
      lastId: id,
      list: [...state.list, {
        id: id,
        text: action.text || 'item ' + id,
      }],
    })
  case 'remove':
    return Object.assign({}, state, {
      list: state.list.filter(i => i.id !== action.id),
    })
  default:
    return state
  }
}

const ListItem = ({onClick, text}) => (
  <div onClick={onClick}>
    {text}
  </div>
)

const List = ({list, onListItemClick}) => (
  <div>
    {list.map(item => (
      <ListItem key={item.id} {...item} onClick={() => onListItemClick(item.id)} />
    ))}
  </div>
)

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <style>{'html { font-size: 16px; }'}</style>
        <List list={[{id: 1, text: 'one'}, {id: 2, text: 'two'}]} onListItemClick={() => 0} />
      </div>
    )
  }
}
