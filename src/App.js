import React from 'react'
import { Provider } from 'react-redux'
import MovieLibrary from './MovieLibrary'
import configureStore from './MovieLibrary/store/configureStore'

const store = configureStore()

const App = () =>
  <Provider store={store}>
    <MovieLibrary />
  </Provider>

export default App
