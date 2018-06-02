import { makeSharedModuleKeyName } from 'simpler-redux'
import { externalServiceFunctions as loaderExternalServiceFunctions } from '../Loader'
import { externalServiceFunctions as errorExternalServiceFunctions } from '../Error'

const url = 'https://jsonplaceholder.typicode.com/todos'

// Define the base keys for the selectors. Once defined these should not be changed since
// they are contained as keys in the selectors object and this would break consumers.
const dataKey = 'data'
const activeKey = 'active'

// Define the keys for service functions. Once defined these should not be changed since
// they are contained as keys in the serviceFunctions object and this would break consumers.
const onGetKey = 'onGet'

// Helpers for the key names with a module suffix to avoid key collision in a consumer.
export const makeDataKey = options =>
  makeSharedModuleKeyName(dataKey, options)

const makeActiveKey = options =>
  makeSharedModuleKeyName(activeKey, options)

export const getInitialState = options => ({
  [makeDataKey(options)]: [],
  [makeActiveKey(options)]: false
})

export const getSelectors = (reducerKey, options) => {
  return {
    [makeDataKey(options)]: state => state[reducerKey][makeDataKey(options)],
    [makeActiveKey(options)]: state => state[reducerKey][makeActiveKey(options)]
  }
}

const operationStart = (store, reducerKey, options) => {
  // Turn on the busy indicator.
  loaderExternalServiceFunctions.setBusy()
  // Indicate to this state that an operation is active.
  store.setRState(reducerKey, { [makeActiveKey(options)]: true }, `activeOn${options.id}`)
}

const operationSuccess = (store, reducerKey, options, data) => {
  // Turn off the busy indicator.
  loaderExternalServiceFunctions.unsetBusy()
  // If requested, filter the data.
  if (typeof options.filter === 'function') {
    data = options.filter(data)
  }
  // Set the returned data in the reducerKey of the state and turn off active.
  store.setRState(reducerKey, { [makeDataKey(options)]: data, [makeActiveKey(options)]: false }, `onGet${options.id}`)
}

const operationFinished = (store, reducerKey, options) => {
  // Turn off the busy indicator.
  loaderExternalServiceFunctions.unsetBusy()
  // Indicate to this state that an operation is not active.
  store.setRState(reducerKey, { [makeActiveKey(options)]: false }, `activeOff${options.id}`)
}

const operationFailed = (store, reducerKey, options) => {
  operationFinished(store, reducerKey, options)
  // Let the error module handle the error.
  errorExternalServiceFunctions.setError('Network Error.')
}

const operationBadStatus = (store, reducerKey, options, response) => {
  operationFinished(store, reducerKey, options)
  options.badStatusCallback(response)
}

export const getServiceFunctions = (reducerKey, options) => {
  return {
    [makeSharedModuleKeyName(onGetKey, options)]: store => {
      operationStart(store, reducerKey, options)
      fetch(url).then(response => {
        if (response.ok) {
          return response.json()
        }
        if (typeof options.badStatusCallback === 'function') {
          return operationBadStatus(store, reducerKey, options, response)
        }
        throw new Error('Error')
      }).then(data =>
        operationSuccess(store, reducerKey, options, data)
      ).catch(() =>
        operationFailed(store, reducerKey, options)
      )
    }
  }
}

export const externalServiceFunctions = {
  setData: (store, reducerKey, options, value) => store.setRState(reducerKey, { [makeDataKey(options)]: value }, `setData${options.id}`)
}
