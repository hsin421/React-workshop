export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

export function incrementRedux() {
  return {
    type: INCREMENT_COUNTER
  }
}

export function decrementRedux() {
  return {
    type: DECREMENT_COUNTER
  }
}