const API_KEY = '54ffed57deb5a7a8688be4de3007e578'
const API_ADDRESS = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`

async function getMoviePage(pageNumber) {
    let res = await fetch(`${API_ADDRESS}&page=${pageNumber}`)
    let data = await res.json()
    if (data.error) {
        throw Error(data.error)
    }
    return data.results
}

const TMDB_API = {
    getMoviePage
}

export default TMDB_API