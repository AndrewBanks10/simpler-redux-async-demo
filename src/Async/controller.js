import Async from './view'
import { serviceFunctions, selectors } from './model'
import { connectLifeCycleComponentWithStore } from 'simpler-redux'

export default connectLifeCycleComponentWithStore({
  uiComponent: Async,
  selectors,
  serviceFunctions
})
