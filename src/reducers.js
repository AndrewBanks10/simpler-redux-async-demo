import { reducerKey as errorReducerKey, reducer as errorReducer } from './Error'
import { reducerKey as loaderReducerKey, reducer as loaderReducer } from './Loader'
import { reducerKey as asyncReducerKey, reducer as asyncReducer } from './Async'

export default {
  [errorReducerKey]: errorReducer,
  [loaderReducerKey]: loaderReducer,
  [asyncReducerKey]: asyncReducer
}
