import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNowPlayingMovies } from '../store/actions'
import TMDBImage from './TMDBImage'

import './MovieLibrary.css'
import { getSortedMovies } from '../store/selectors'
import MoviesList from './MoviesList'
import SortingOptions from './SortingOptions'

class MovieLibrary extends Component {
  static propTypes = {

  }

  state = {
    selectedMovie: null
  }

  handleSelectMovie = item => this.setState({ selectedMovie: item })

  componentDidMount() {
    const { fetchNowPlayingMovies } = this.props
    fetchNowPlayingMovies(1,2,3)
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
}), { fetchNowPlayingMovies })(MovieLibrary)


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