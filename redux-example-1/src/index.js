import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { merge, map, append } from 'ramda'
const store = createStore(function (state, action) {
  if (!state) { state = { title: "Hello Redux", counter: 0, items: [], itemText: '' } }
  if (action.type === 'SET_TITLE') { return merge(state, { title: action.payload }) }
  if (action.type === 'INCR') { return merge(state, { counter: state.counter + 1 }) }
  if (action.type === 'DECR') { return merge(state, { counter: state.counter - 1 }) }
  if (action.type === 'SET') { return merge(state, { itemText: action.payload }) }
  if (action.type === 'ADD') { return merge(state, {
    itemText: '',
    items: append(state.itemText, state.items)
  })}
  return state
})

function App (props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <input
        value={props.title}
        onChange={e => props.dispatch({
          type: 'SET_TITLE',
          payload: e.target.value
        })}
      />
      <hr />
      <div>
        <h2>Counter: { props.counter } </h2>
        <button onClick={e => props.dispatch({type: 'INCR'})}>Increment</button>
        <button onClick={e => props.dispatch({type: "DECR"})}>Decrement</button>
      </div>
      <hr />
      <form onSubmit={e => {
        e.preventDefault()
        props.dispatch({type: 'ADD'})
      }}>
        <input
          value={props.itemText}
          onChange={e => props.dispatch({type: 'SET', payload: e.target.value })}
        />
      </form>
      <ul>
        { map(item => <li>{item}</li>, props.items)}
      </ul>
    </div>
  )
}

const ConnectedApp = connect(function(state) {
  return state
})(App)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp>
      <h2>Foo</h2>
    </ConnectedApp>
  </Provider>,
  document.getElementById('root')
);
