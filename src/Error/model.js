import { generalReducer } from 'simpler-redux'

export const reducerKey = 'error'

let store
export const storeIsDefinedCallback = reduxStore =>
  (store = reduxStore)

const initialState = {
  error: ''
}

export const serviceFunctions = {
  clearError: () => store.setRState(reducerKey, { error: '' })
}

export const externalServiceFunctions = {
  setError: error => store.setRState(reducerKey, { error: error })
}

export const reducer = generalReducer(reducerKey, initialState)
