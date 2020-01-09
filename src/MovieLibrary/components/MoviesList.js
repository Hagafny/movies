import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import TMDBImage from './TMDBImage'
import './MoviesList.css'

export default class MoviesList extends PureComponent {

  static propTypes = {
    movies: PropTypes.array.isRequired
  }

  state = {
    selectedMovie: null
  }

  handleSelectMovie = item => this.setState({ selectedMovie: item })

  handleSortingChange = sortingType => console.log(sortingType)

  render() {

    const { movies } = this.props
    const { selectedMovie } = this.state

    return (
      <div className="movies-list">
          <div>
            <span>Sort by:</span>
            <SortingOptions onChange={this.handleSortingChange} />
          </div>
          <div class="items">
            <section class="main-container">
              <div class="box">
                {
                  movies.map(movie =>
                    <MovieListItem key={movie.id} movie={movie} isSelected={selectedMovie === movie} onSelect={this.handleSelectMovie} />
                  )
                }
              </div>
            </section>
          </div>
        {
          selectedMovie && (
            <ExpandedMovieItem movie={selectedMovie} />
          )
        }
      </div>
    )
  }
}

const ExpandedMovieItem = ({ movie: { title, original_title, poster_path, overview, vote_average, vote_count } }) => (
  <div className="expanded-movie-item">
    <TMDBImage src={poster_path} className="poster" />
    <div className="description">
      <h2>{title}({original_title})</h2>
      <div><h4>Rank(votes count)</h4>: <span>{vote_average}({vote_count})</span></div>
      <span>{overview}</span>
    </div>
  </div>
)

class MovieListItem extends Component {
  handleClick = () => {
    const { movie, onSelect } = this.props
    onSelect(movie)
  }

  render() {
    const { movie: { title, vote_average, poster_path }, isSelected } = this.props
    return (
      <a href="" className={classNames('movie-list-item', { 'selected': isSelected })} onClick={this.handleClick}>
        <TMDBImage src={poster_path} className="poster" />
      </a>

      // <div className={classNames('movie-list-item', { 'selected': isSelected })} onClick={this.handleClick}>{title}({vote_average})</div>
    )
  }
}

class SortingOptions extends Component {

  state = {
    value: ''
  }

  handleChange = e => {
    const selectedValue = e.target.value
    const { onChange } = this.props
    this.setState({ value: selectedValue })
    onChange(selectedValue)
  }

  render() {

    return (
      <select value={this.state.value} onChange={this.handleChange}>
        <option value=""></option>
        <option value="name_asc">A -> Z</option>
        <option value="name_desc">Z -> A</option>
        <option value="rating">Rating</option>
      </select>
    )
  }
}

