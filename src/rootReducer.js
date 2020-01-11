import { combineReducers } from 'redux'
import { movieReducer, sortingReducer } from './MovieLibrary'

const rootReducer = combineReducers({
  movieLib: movieReducer,
  sorting: sortingReducer
});

export default rootReducer
