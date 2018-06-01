import { generalReducer, stateAccessors } from 'simpler-redux'

export const reducerKey = 'loader'

let setState
export const storeIsDefinedCallback = reduxStore =>
  ({setState} = stateAccessors(reduxStore, reducerKey))

const initialState = {
  isBusy: false
}

export const externalServiceFunctions = {
  setBusy: () => setState({isBusy: true}, 'setBusy'),
  unsetBusy: () => setState({isBusy: false}, 'unsetBusy')
}

export const reducer = generalReducer(reducerKey, initialState)
