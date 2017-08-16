import React from 'react'
import {connect} from 'react-redux'

const _List = ({list, onItemClick}) => (
  <ul>
    {list.map(item => (
      <li key={item.id} onClick={() => onItemClick(item.id)}>{item.text}</li>
    ))}
  </ul>
)

const mapStateToProps = (state) => ({
  list: state.list,
})

const mapDispatchToProps = (dispatch) => ({
  onItemClick: id => {dispatch({type: 'remove', id})},
})

const List = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_List)

export default List
