export const reducerKey = 'loader'

export const initialUIState = {
  isBusy: false
}

export const initialState = initialUIState

let reducerState
export const storeIsDefinedCallback = (store, stateAccessors) =>
  ({reducerState} = stateAccessors(store, reducerKey, initialState))

export const externalServiceFunctions = {
  setBusy: () => reducerState.isBusy = true,
  unsetBusy: () => reducerState.isBusy = false
}
