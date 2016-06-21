
import { 
  INCREMENT_COUNTER, 
  DECREMENT_COUNTER, 
  INPUT_TYPING,
  HANDLE_DELETE,
  HANDLE_SUBMIT,
  REQUEST_TODOS } from './actions.js';
import { combineReducers } from 'redux';

const initialState = [
  {id: 1, count: 0},
  {id: 2, count: 0},
  {id: 3, count: 0}
];

function counters(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return [
      ...state.slice(0, action.payload.index),
      Object.assign({}, state[action.payload.index], {
        count: state[action.payload.index].count + 1
      }),
      ...state.slice(action.payload.index + 1)
      ];
    case DECREMENT_COUNTER:
      return [
      ...state.slice(0, action.payload.index),
      Object.assign({}, state[action.payload.index], {
        count: state[action.payload.index].count - 1
      }),
      ...state.slice(action.payload.index + 1)
      ];
    default:
      return state
  }
}

const todoInitialState = {
  inputValue: '',
  todos: [],
  isLoaded: false
};

function todos(state = todoInitialState, action) {
  switch(action.type) {
    case INPUT_TYPING: 
      return Object.assign({}, state, {
        inputValue: action.payload.inputValue
      });

    case HANDLE_SUBMIT:
      return Object.assign({}, state, {
        todos: [...state.todos, action.payload.todo],
        inputValue: ''
      });

    case HANDLE_DELETE:
      return Object.assign({}, state, {
        todos: state.todos.filter( 
          (todo, index) => index !== action.payload.index
        )
      });

    case REQUEST_TODOS:
      return Object.assign({}, state, {
        todos: action.payload.todos,
        isLoaded: true
      });

    default: 
      return state;
  }
}

const rootReducer = combineReducers({
  counters,
  todos
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

