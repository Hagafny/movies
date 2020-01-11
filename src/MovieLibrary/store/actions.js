import { FETCH_MOVIES, SET_SORTING } from '../../actionTypes'
import topRatedMovies from '../mocks/topTatedMovies'

export function fetchTopRatedMovies() {
  return {
    type: FETCH_MOVIES,
    payload: topRatedMovies
  }
}

export function setSortingMethod(sortingMethod) {
  return {
    type: SET_SORTING,
    payload: sortingMethod
  }
}

