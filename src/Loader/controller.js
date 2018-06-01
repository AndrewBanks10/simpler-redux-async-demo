import Loader from './view'
import { reducerKey, storeIsDefinedCallback } from './model'
import { connectWithStore, allStateToProps } from 'simpler-redux'

export default connectWithStore({
  uiComponent: Loader,
  mapStateToProps: allStateToProps(reducerKey),
  storeIsDefinedCallback
})
