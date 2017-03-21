
const { createStore } = require('redux')
const { reduce, merge } = require('ramda')

// existing state and an action
const reducer = function (state, action) {
  // set initial state
  if (!state) {
    state = {
      counter: 0
    }
  }

  // check our action
  if (action.type === 'INCREMENT') {
    return merge(state,{ counter: state.counter + 1})
  }

  if (action.type === 'DECREMENT') {
    return merge(state,{ counter: state.counter - 1 })
  }

  // return new state
  return state
}

const store = createStore(reducer)

store.subscribe(function () {
  console.log(store.getState())
})

const action = {type: 'INCREMENT'}
store.dispatch(action)

module.exports = { store }
