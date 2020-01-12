import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchMovies } from '../store/actions'
import TMDBImage from './TMDBImage'
import { getSortedMovies } from '../store/selectors'
import MoviesList from './MoviesList'
import SortingOptions from './SortingOptions'
import { debounce } from '../../util/debounce'
import './MovieLibrary.css'


class MovieLibrary extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    fetchMovies: PropTypes.func.isRequired
  }

  state = {
    selectedMovie: null
  }

  get atWindowBottom() {
    return window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
  }

  handleSelectMovie = item => this.setState({ selectedMovie: item })

  async componentDidMount() {
    const { fetchMovies } = this.props

    // Detect when we are at the bottom and fetch more movies.
    // We are debouncing in order to avoid execive calls to our API
    window.addEventListener("scroll", debounce(() => {
      if (this.atWindowBottom) {
        fetchMovies()
      }
    }, 500));

    // Get the first 3 pages from the aPI.
    // This it the reason we shouldn't use redux-thunk in production. I could've avoided
    // this callback hell by implementing fetchMovies to get a "pageNumber" argument and call is as
    // [1,2,3].forEach(fetchMovies)
    // However I believe the page number should be abstracted away and the developer using our code shouldn't 
    // need to know the exact implementation details of our API.
    // I would use Redux-Promise, Redux-Saga or Redux-Observables in order to be able to create a better async flow.
    fetchMovies(() => {
      fetchMovies(() => {
        fetchMovies()
      })
    })
  }

  render() {
    const { movies } = this.props
    const { selectedMovie } = this.state
    return (
      <>
        <div className="movieSorter">
          <span>Sort by:</span>
          <SortingOptions />
        </div>
        <section className="main-container">
          {movies.length && <MoviesList movies={movies} handleSelectMovie={this.handleSelectMovie} />}

          {
            selectedMovie &&
            (
              <ExpandedMovieItem movie={selectedMovie} />
            )
          }
        </section>
      </>
    );
  }
}

export default connect(state => ({
  movies: getSortedMovies(state)
}), { fetchMovies })(MovieLibrary)


const ExpandedMovieItem = ({ movie: { title, original_title, poster_path, overview, vote_average, vote_count } }) => (
  <div id="expendedMovie" className="expanded-movie-item">
    <div>
      <a href="#close" title="Close" className="close">X</a>

      <div className="expended-movie-container">
        <div className="expended-movie-title">
          <h2>{title} ({original_title})</h2>
        </div>

        <div className="expended-movie-rank">
          <h4>Rank(votes count)</h4>: <span>{vote_average} ({vote_count})</span>
        </div>
        <div className="expended-movie-overview">
          <span>{overview}</span>

        </div>
        <div className="expended-movie-poster">
          <TMDBImage src={poster_path} title={title} />
        </div>
      </div>
    </div>
  </div >
)