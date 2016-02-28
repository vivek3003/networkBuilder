import {INIT, EDIT_OPTIONS, RESET_OPTIONS, LOGOUT, INITITAL_OPTIONS, GOT_GRAPH} from '../actions/actions.js';
import assign from 'object-assign';

export function options(state = INITITAL_OPTIONS, action){
  switch(action.type){
    case INIT:
      return assign({}, state, action.state.options);
    case EDIT_OPTIONS:
      return assign({}, state, action.options);
    case RESET_OPTIONS:
      return assign({}, state, INITITAL_OPTIONS);
    case LOGOUT:
      return INITITAL_OPTIONS;
    case GOT_GRAPH:
      return assign({}, state, action.graph.options);
  }
  return state;
}