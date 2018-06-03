import { generalReducer, stateAccessors } from 'simpler-redux'
import { externalServiceFunctions as loaderExternalServiceFunctions } from '../Loader'
import { externalServiceFunctions as errorExternalServiceFunctions } from '../Error'

const url = 'https://jsonplaceholder.typicode.com/todos'

export const reducerKey = 'async'

// Used for simpler state management when shared modules are not going to be used.
// For example, setState({active: true}) is the usage.
let setState
export const storeIsDefinedCallback = store =>
  ({setState} = stateAccessors(store, reducerKey))

const initialState = {
  data : [],
  active : false
}

export const selectors = {
  data : state => state[reducerKey].data,
  active: state => state[reducerKey].active
}

const startOperation = () => {
  // Turn on the busy indicator.
  loaderExternalServiceFunctions.setBusy()
  // Indicate to this state that an operation is active.
  setState({active: true})
}

const operationSuccess = data => {
  // Turn off the busy indicator.
  loaderExternalServiceFunctions.unsetBusy()
  // Set the returned data in the reducerKey of the state and turn off active.
  setState({data, active: false})
}

const operationFailed = () => {
  // Turn off the busy indicator.
  loaderExternalServiceFunctions.unsetBusy()
  // Indicate to this state that an operation is not active.
  setState({active: false})
  // Let the error module handle the error.
  errorExternalServiceFunctions.setError('Network Error.')
}

export const serviceFunctions = {
  onGet: () => {
    startOperation()
    fetch(url).then(response => {
      if (!response.ok) {
        throw new Error('Error')
      }
      return response.json()
    }).then(data =>
      operationSuccess(data)
    ).catch(() =>
      operationFailed()
    )
  },
  clear: store => setState({data: []})
}

export const reducer = generalReducer(reducerKey, initialState)
