import { externalServiceFunctions as loaderExternalServiceFunctions } from '../Loader'
import { externalServiceFunctions as errorExternalServiceFunctions } from '../Error'

const url = 'https://jsonplaceholder.typicode.com/todos'

export const reducerKey = 'async'

export const initialUIState = {
  data : [],
  active : false
}

export const initialState = initialUIState

let setState, reducerState
export const storeIsDefinedCallback = (store, stateAccessors) =>
  ({setState, reducerState} = stateAccessors(store, reducerKey, initialState))

const startOperation = () => {
  // Turn on the busy indicator.
  loaderExternalServiceFunctions.setBusy()
  // Indicate to this state that an operation is active.
  reducerState.active = true
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
  reducerState.active = false
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
  clear: () => reducerState.data = []
}

export const isDynamicReducer = true
