import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'

import TMDBImage from './TMDBImage'
import './MoviesList.css'

export default class MoviesList extends PureComponent {
  static propTypes = {
    movies: PropTypes.array.isRequired
  }

  render() {
    const { movies, handleSelectMovie } = this.props

    console.log('rendering them movies')
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
        <TMDBImage src={poster_path} title={title} onClick={this.handleClick} />
      </a>
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

