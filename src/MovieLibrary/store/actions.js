import {
  SET_SORTING,
  FETCH_MOVIES_STARTED,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE
} from '../../actionTypes'

export function setSortingMethod(sortingMethod) {
  return {
    type: SET_SORTING,
    payload: sortingMethod
  }
}

export function fetchTopRatedMovies() {
  return dispatch => {
    dispatch(fetchMoviesStarted());

    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=54ffed57deb5a7a8688be4de3007e578&language=en-US&page=1')
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        dispatch(fetchMoviesSuccess(response.results));
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