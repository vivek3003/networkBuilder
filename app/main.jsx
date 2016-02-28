import React from 'react';
import ReactDOM from 'react-dom';
import { syncHistory, routeReducer } from 'react-router-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import assign from "object-assign";
import thunk from 'redux-thunk';

import {default as reducers} from './reducers/';
import {logger, syncGraph} from './middlewares/';
import {default as fRef} from './utils/firebase';

import AppContainer from './containers/AppContainer.jsx';
import List from './containers/List.jsx';
import Home from './containers/Home.jsx';
import Login from './containers/Login.jsx';

const reducer = combineReducers(assign({}, reducers, {
  routing: routeReducer
}))

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(hashHistory)

const createStoreWithMiddleware = applyMiddleware(
  logger,
  thunk,
  reduxRouterMiddleware,
  syncGraph
)(createStore);

const store = createStoreWithMiddleware(reducer)

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store)

const testAuth = function(nextState, replace){
  if (!fRef.isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={AppContainer}>
              <IndexRoute component={List} onEnter={testAuth}/>
              <Route path="/login" component={Login} name='login'/>
              <Route path="/graph/:graph_key" component={Home} name='graph' onEnter={testAuth}/>
              <Route path="/list" component={List} name='list' onEnter={testAuth}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);