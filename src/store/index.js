import  reducer  from './reducer'
import thunk from 'redux-thunk'
import { createStore, compose, applyMiddleware } from 'redux'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk)
)
const store = createStore(
    reducer,enhancer
);

export default store;