import Component from './view'
import { serviceFunctions, selectors, storeIsDefinedCallback } from './model'
import { connectWithStore } from 'simpler-redux'

export default connectWithStore({
  uiComponent: Component,
  selectors,
  serviceFunctions,
  // This will be called with the store as a parameter on the first render.
  storeIsDefinedCallback,
  // This is used to not add a store parameter to each function in the serviceFunctions object.
  // So the parameters will be just what the UI passed. 
  usingStateAccessors: true
})
