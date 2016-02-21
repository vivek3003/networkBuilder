import React from 'react';
import ReactDOM from 'react-dom';
import { syncHistory, routeReducer } from 'react-router-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import assign from "object-assign";

import {default as reducers} from './reducers/';
import {logger, localStorer} from './middlewares/';

import AppContainer from './containers/AppContainer.jsx';
import List from './containers/List.jsx';
import Home from './containers/Home.jsx';

const reducer = combineReducers(assign({}, reducers, {
  routing: routeReducer
}))

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(hashHistory)

const createStoreWithMiddleware = applyMiddleware(
  logger,
  localStorer,
  reduxRouterMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer)

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={AppContainer}>
              <IndexRoute component={List}/>
              <Route path="/draw" component={Home} name='draw'/>
              <Route path="/list" component={List} name='list'/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
