import React from 'react'

const TMDB_IMAGE_BASE_PATH = 'https://image.tmdb.org/t/p/w500/'

const TMDBImage = ({ src, title, ...restProps }) => (
  <img src={`${TMDB_IMAGE_BASE_PATH}${src}`} alt={title} {...restProps} />
)

export default TMDBImage