import {
  generalReducer,
  buildServiceFunctionsObjectFromShared,
  buildSelectorsObjectFromShared
} from 'simpler-redux'
import {
  serviceFunctions as sharedAsyncServiceFunctions,
  selectors as sharedAsyncSelectors,
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
  ...buildSelectorsObjectFromShared(sharedAsyncSelectors, reducerKey, baseOptions)
}

const filter = data => data
export const serviceFunctions = {
  ...buildServiceFunctionsObjectFromShared(sharedAsyncServiceFunctions, reducerKey, { ...baseOptions, filter }),
  clear: store => sharedAsyncExternalServiceFunctions.setData(store, reducerKey, baseOptions, []),
  componentDidMount: store => sharedAsyncServiceFunctions.onGet(store, reducerKey, baseOptions),
  onConstructor: () => console.log('onConstructor'),
  componentWillUnmount: () => console.log('onComponentWillUnmount'),
  onRender: () => console.log('onRender')
}

export const reducer = generalReducer(reducerKey, initialState)
