import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home.jsx';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import graphApp from './reducers/';
import {logger, localStorer} from './middlewares/';


const createStoreWithMiddleware = applyMiddleware(
  logger,
  localStorer
)(createStore);

const store = createStoreWithMiddleware(graphApp)
console.log(store.getState())
ReactDOM.render(
    <Provider store={store}>
        <Home/>
    </Provider>,
    document.getElementById('app'));
