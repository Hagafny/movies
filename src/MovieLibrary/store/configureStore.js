import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../rootReducer'

const configureStore = () => {
    
    // Redux DevTools is only for development and should not be used in production
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    )

    return store
}

export default configureStore