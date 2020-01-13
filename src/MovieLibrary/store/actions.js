import {
  SET_SORTING,
  FETCH_MOVIES_STARTED,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
} from '../../actionTypes'

import TMDB from '../api'

import { getCurrentMoviePageNumber } from './selectors'

export function setSortingMethod(sortingMethod) {
  return {
    type: SET_SORTING,
    payload: sortingMethod
  }
}

export function fetchMovies(callback) {
  return (dispatch, getState) => {
    dispatch(fetchMoviesStarted());
    const moviePageNumber = getCurrentMoviePageNumber(getState())
    TMDB.getMoviePage(moviePageNumber)
      .then(moviesOnPage => {
        dispatch(fetchMoviesSuccess(moviesOnPage));
        if (typeof callback === typeof Function)
          callback()
      })
      .catch(err => {
        dispatch(fetchMoviesFailure(err.message));
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