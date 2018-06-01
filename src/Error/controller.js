// import PropTypes from 'prop-types'
import Error from './view'
import { serviceFunctions, reducerKey, storeIsDefinedCallback } from './model'
import { connectWithStore, allServiceFunctionsToProps, allStateToProps } from 'simpler-redux'

export default connectWithStore({
  uiComponent: Error,
  mapStateToProps: allStateToProps(reducerKey),
  mapDispatchToProps: allServiceFunctionsToProps(serviceFunctions),
  storeIsDefinedCallback
})
