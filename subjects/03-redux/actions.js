export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const INPUT_TYPING = 'INPUT_TYPING';
export const HANDLE_SUBMIT = 'HANDLE_SUBMIT';
export const HANDLE_DELETE = 'HANDLE_DELETE';
export const REQUEST_TODOS = 'REQUEST_TODOS';

export function incrementRedux(index) {
  return {
    type: INCREMENT_COUNTER,
    payload: { index }
  }
}

export function decrementRedux(index) {
  return {
    type: DECREMENT_COUNTER,
    payload: { index }
  }
}

export function inputTyping(inputValue) {
	return {
		type: INPUT_TYPING,
		payload: { inputValue }
	}
}

export function handleSubmit(todo) {
	return {
		type: HANDLE_SUBMIT,
		payload: { todo }
	}
}

export function handleDelete(index) {
	return {
		type: HANDLE_DELETE,
		payload: { index }
	}
}

export function requestTodosRedux(todos) {
	return {
		type: REQUEST_TODOS,
		payload: { todos }
	}
}

