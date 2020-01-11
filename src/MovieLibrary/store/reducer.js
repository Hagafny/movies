import { FETCH_MOVIES, SET_SORTING } from '../../actionTypes'

const initialState = {
  movies: [],
  sortingBy: 'none'
}

export default function movieReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movies: payload
      }
      case SET_SORTING:
        return {
          ...state,
          sortingBy: payload
        }
    default:
      return state
  }
}
