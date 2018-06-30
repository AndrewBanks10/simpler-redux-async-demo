export const reducerKey = 'loader'

export const initialUIState = {
  busyCounter: 0
}

export const initialState = initialUIState

let reducerState
export const storeIsDefinedCallback = (store, stateAccessors) =>
  ({reducerState} = stateAccessors(store, reducerKey, initialState))

export const externalServiceFunctions = {
  setBusy: () => reducerState.busyCounter++,
  unsetBusy: () => reducerState.busyCounter--
}

export const isDynamicReducer = true
