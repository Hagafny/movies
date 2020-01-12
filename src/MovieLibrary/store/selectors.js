import { createSelector } from 'reselect'

const getMovies = state => state.movieLib.movies
const getSortingMethod = state => state.sorting

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

export const getSortedMovies = createSelector(
    [getMovies, getSortingMethod],
    (movies, sortingMethod) => {

        switch (sortingMethod) {
            case 'name_asc':
                return [...movies.sort((a, b) => a.title.localeCompare(b.title))]
            case 'name_desc':
                return [...movies.sort((a, b) => b.title.localeCompare(a.title))]
            case 'rating':
                return [...movies.sort(byRatingAndVoteCount)]
            case 'none':
            default:
                return movies
        }
    }
)