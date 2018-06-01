import React from 'react'
import { render } from 'react-dom'
import 'isomorphic-fetch'
import App from './App.jsx'

render(
  <App />,
  document.getElementById('reactroot')
)
