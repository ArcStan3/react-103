import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'


const App = function (props) {
  return (
    <div>
      <input type="text"
        value={props.title}
        onChange={event => props.dispatch({
          type: 'SET_TITLE', payload: event.target.value
        })}
      />
      <h1>{props.title}</h1>
      <hr />
      <h2>Counter: {props.counter}</h2>
      <button onClick={e => props.dispatch({type: 'INCR'})}>Increment</button>
      <button onClick={e => props.dispatch({type: 'DECR'})}>Decrement</button>
    </div>
  )
}

const store = createStore(function (state, action) {
  if (!state) { state = { title: 'foo', counter: 0}}
  if (action.type === 'SET_TITLE') {
    return { title: action.payload, counter: state.counter }
  }
  if (action.type === 'INCR') {
    return { title: state.title, counter: state.counter + 1 }
  }
  if (action.type === 'DECR') {
    return { title: state.title, counter: state.counter - 1 }
  }

  return state
})

const ConnectedApp = connect(function (state) {
  return { title: state.title }
})(App)

// function connect (fn) {
//   return function (Component) {
//     return <Component {...fn(store.getState())} />
//   }
// }

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
)
