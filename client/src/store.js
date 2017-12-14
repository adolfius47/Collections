
import {createStore, applyMiddleware} from 'redux';

import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducers from './reducers';


let middleWares = [promise(), thunk];
if (process.env.NODE_ENV !== 'production') {
    middleWares.push(createLogger())
}

const middleware = applyMiddleware(...middleWares)

const store = createStore(reducers, middleware)



export default store;