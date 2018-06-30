// Controller
import { connectWithStore } from 'simpler-redux'
import uiComponent from './view'
import * as modelDefinition from './model'

export default connectWithStore({ uiComponent, ...modelDefinition })
