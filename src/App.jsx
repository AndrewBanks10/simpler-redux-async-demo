import React from 'react'
import { Provider } from 'react-redux'
import simplerReduxStore from './reduxstore'
import Async from './Async'

const App = () =>
  <Provider store={simplerReduxStore}>
    <Async />
  </Provider>

export default App
