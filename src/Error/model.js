import { stateAccessors } from 'simpler-redux'

export const reducerKey = 'error'

export const initialUIState = {
  error: ''
}

export const initialState = initialUIState

let reducerState
export const storeIsDefinedCallback = store =>
  ({reducerState} = stateAccessors(store, reducerKey, initialState))

export const serviceFunctions = {
  clearError: () => reducerState.error = ''
}

export const externalServiceFunctions = {
  setError: error => reducerState.error = error
}
