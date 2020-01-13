import { createSelector } from 'reselect'

export const getMovies = state => state.movieLib.movies
export const getSortingMethod = state => state.sorting
export const getCurrentMoviePageNumber = state => state.movieLib.page

function byRatingAndVoteCount(a, b) {
    if (b.vote_average > a.vote_average) {
        return 1
    }
    else if (b.vote_average < a.vote_average) {
        return -1
    }
    else {
        if (b.vote_count > a.vote_count) {
            return 1
        }
        else if (b.vote_count < a.vote_count) {
            return -1
        }
        else {
            return 0
        }
    }
}

function byTitle(a, b) {
    return a.title.localeCompare(b.title)
}

export const getSortedMovies = createSelector(
    [getMovies, getSortingMethod],
    (movies, sortingMethod) => {
        switch (sortingMethod) {
            case 'name_asc':
                return [...movies.sort((a, b) => byTitle(a, b))]
            case 'name_desc':
                return [...movies.sort((a, b) => byTitle(b, a))]
            case 'rating':
                return [...movies.sort((a, b) => byRatingAndVoteCount(a, b))]
            case 'none':
            default:
                return movies
        }
    }
)