export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const INPUT_TYPING = 'INPUT_TYPING';
export const HANDLE_SUBMIT = 'HANDLE_SUBMIT';
export const HANDLE_DELETE = 'HANDLE_DELETE';
export const REQUEST_TODOS = 'REQUEST_TODOS';

// Delete constants
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_ERROR = 'DELETE_ERROR';
export const DELETE_BEGIN = 'DELETE_BEGIN';

import { deleteFromBackend } from './fakeDb';

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

function deleteSuccess(index) {
	return {
		type: DELETE_SUCCESS,
		payload: { index }
	}
}

function deleteError(error) {
	return {
		type: DELETE_ERROR,
		payload: { error }
	}
}

function deleteBegin() {
	return {
	 	type: DELETE_BEGIN
	}
}

export function handleDelete(index) {
	return dispatch => {
		dispatch(deleteBegin());
		deleteFromBackend(response => {
			if (response.success) {
				dispatch(deleteSuccess(index));
			} else {
				dispatch(deleteError(response.error));
			}
		})
	}
}

export function requestTodosRedux(todos) {
	return {
		type: REQUEST_TODOS,
		payload: { todos }
	}
}

