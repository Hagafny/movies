import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TMDBImage from './TMDBImage'
import './MoviesList.css'

export default class MoviesList extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    handleSelectMovie: PropTypes.func.isRequired
  }

  shouldComponentUpdate(prevProps) {
    return prevProps.movies !== this.props.movies
  }

  render() {
    const { movies, handleSelectMovie } = this.props
    return (
      <div className="movies-list">
        <div className="box">
          {
            movies.map(movie =>
              <MovieListItem key={movie.id} movie={movie} onSelect={handleSelectMovie} />
            )
          }
        </div>
      </div>
    )
  }
}

class MovieListItem extends Component {
  handleClick = () => {
    const { movie, onSelect } = this.props
    onSelect(movie)
  }

  render() {
    const { movie: { title, poster_path } } = this.props
    return (
      <a href="#expendedMovie" className={'poster'} onClick={this.handleClick}>
        <TMDBImage src={poster_path} title={title} />
      </a>
    )
  }
}

