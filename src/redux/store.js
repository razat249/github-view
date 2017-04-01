import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import logger from 'redux-logger';
import promise from 'redux-promise-middleware';

import reducer from './reducers';

const middleware = applyMiddleware(promise(), logger);

/* eslint-disable no-underscore-dangle */
export default createStore(
    reducer, 
    composeWithDevTools (middleware)
)
/* eslint-enable */