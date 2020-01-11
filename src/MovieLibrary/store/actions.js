import {
  SET_SORTING,
  FETCH_MOVIES_STARTED,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE
} from '../../actionTypes'

import { getMovies } from '../api'

export function setSortingMethod(sortingMethod) {
  return {
    type: SET_SORTING,
    payload: sortingMethod
  }
}

export function fetchNowPlayingMovies(...pageNumbers) {
  return async dispatch => {
    dispatch(fetchMoviesStarted());
    
    const moviePages = pageNumbers.map(pageNumber => getMovies(pageNumber))
    Promise.all(moviePages)
      .then(allMoviesByPages => {
        const moviesToDisplay = allMoviesByPages.reduce((movies, moviePage) => [...movies, ...moviePage], [])
        dispatch(fetchMoviesSuccess(moviesToDisplay));
      })
      .catch(err => {
        dispatch(fetchMoviesFailure(err));
      });
  }
}

const fetchMoviesStarted = () => ({
  type: FETCH_MOVIES_STARTED
});

const fetchMoviesSuccess = movies => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies
});

const fetchMoviesFailure = error => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error
});