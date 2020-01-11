import { combineReducers } from 'redux'
import { movieReducer } from './MovieLibrary'

const rootReducer = combineReducers({
  movieLib: movieReducer,
});

export default rootReducer
