import { FETCH_MOVIES_STARTED, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_FAILURE } from '../../../actionTypes'

const initialState = {
  page: 1,
  loading: false,
  movies: [],
  error: null
}

export default function movieReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case FETCH_MOVIES_STARTED:
      return {
        ...state,
        loading: true
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        page: state.page + 1,
        movies: [...state.movies, ...payload]
      };
      case FETCH_MOVIES_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload
        };
    default:
      return state
  }
}
