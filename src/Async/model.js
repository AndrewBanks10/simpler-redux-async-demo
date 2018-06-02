import {
  generalReducer,
  makeSharedModuleKeyName
} from 'simpler-redux'
import {
  getServiceFunctions as sharedAsyncGetServiceFunctions,
  getSelectors as sharedAsyncGetSelectors,
  getInitialState as sharedAsyncInitialState,
  externalServiceFunctions as sharedAsyncExternalServiceFunctions
} from '../SharedModel/Async'

export const reducerKey = 'async'
// If this is changed then the view prop keys need to be changed. So don't change it once it is defined.
const asyncModuleId = 'AsyncModule'
const baseOptions = { id: asyncModuleId }

const initialState = {
  ...sharedAsyncInitialState(baseOptions)
}

export const selectors = {
  ...sharedAsyncGetSelectors(reducerKey, baseOptions)
}

const filter = data => data
const sharedAsyncServiceFunctions = sharedAsyncGetServiceFunctions(reducerKey, { ...baseOptions, filter })
export const serviceFunctions = {
  ...sharedAsyncServiceFunctions,
  clear: store => sharedAsyncExternalServiceFunctions.setData(store, reducerKey, baseOptions, []),
  componentDidMount: store => sharedAsyncServiceFunctions[makeSharedModuleKeyName('onGet', baseOptions)](store, reducerKey, baseOptions),
  onConstructor: () => console.log('onConstructor'),
  componentWillUnmount: () => console.log('onComponentWillUnmount'),
  onRender: () => console.log('onRender')
}

export const reducer = generalReducer(reducerKey, initialState)
