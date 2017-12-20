
import {createStore, applyMiddleware} from 'redux';

import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducers from './reducers';
import createSagaMiddleware from "redux-saga";

import sagas from "./sagas";

let middleWares = [promise(), thunk];
    middleWares.push(createLogger())

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(...middleWares,sagaMiddleware)

const store = createStore(reducers, middleware)
sagaMiddleware.run(sagas)



export default store;