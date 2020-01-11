import { FETCH_MOVIES } from '../../../actionTypes'

const initialState = {
  movies: [],
}

export default function movieReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movies: payload
      }
    default:
      return state
  }
}
