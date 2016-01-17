import {INIT, EDIT_OPTIONS, RESET_OPTIONS} from '../actions/actions.js';
import assign from 'object-assign';

const initialState = {
  'width': 600,
  'height': 400,
  'background':'#ffffff',
  'allowForce':true,
  'directional':true,
  'allowGrow':false,

  'nodeRadius':10,
  'nodeFill':'#1492e6',
  'nodeCharge':-1000,
  'nodeTextFill':'#1b998b',

  'linkLength':90,
  'linkStroke':'#fdc202'
};

export function options(state = initialState, action){
  switch(action.type){
    case INIT:
      return assign({}, state, action.state.options);
    case EDIT_OPTIONS:
      return assign({}, state, action.options);
    case RESET_OPTIONS:
      return assign({}, state, initialState);
  }
  return state;
}