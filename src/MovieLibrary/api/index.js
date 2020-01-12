const API_KEY = '54ffed57deb5a7a8688be4de3007e578'
const API_ADDRESS = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
const corruptedMovieId = 599845

async function getMoviePage(pageNumber) {
    let res = await fetch(`${API_ADDRESS}&page=${pageNumber}`)
    let data = await res.json()

    if (data.error) {
        throw Error(data.error)
    }
    
    // In the TMDB there is a corrupted movie, The Immortal (L'immortale)  that is returned several times
    // from their API and causes strange behavior. I filtered the specific movie out in order to create a working demo.
    // In production I would check for duplicate ID's by storing all IDs with an EC6 Set object.
    const filteredMovies = data.results.filter(({ id }) => id !== corruptedMovieId)
    return filteredMovies
}

const TMDB_API = {
    getMoviePage
}

export default TMDB_API