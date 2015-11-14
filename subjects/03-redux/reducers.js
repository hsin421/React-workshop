import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './actions.js';
import { combineReducers } from 'redux';

function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1
    case DECREMENT_COUNTER:
      return state - 1
    default:
      return state
  }
}

const rootReducer = combineReducers({
  counter
})

export default rootReducer


// *** For multiple counters
 	// return [
  //     ...state.slice(0, action.index),
  //     Object.assign({}, state[action.index], {
  //       count: state[action.index].number + 1
  //     }),
  //     ...state.slice(action.index + 1)
  //     ]