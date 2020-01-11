import { createSelector } from 'reselect'

const getMovies = state => state.movieLib.movies
const getSortingMethod = state => state.movieLib.sortingBy

export const getSortedMovies = createSelector(
    [getMovies, getSortingMethod],
    (movies, sortingMethod) => {
        switch (sortingMethod) {
            case 'name_asc':
                return [...movies.sort((a, b) => a.title.localeCompare(b.title))]
            case 'name_desc':
                return [...movies.sort((a, b) => b.title.localeCompare(a.title))]
            case 'rating':
                return [...movies.sort((a, b) => a.vote_average > b.vote_average ? 1 : -1 )]
            case 'none':
            default:
                return movies
        }
    }
)