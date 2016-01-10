import {ADD_NODE, ADD_LINK} from '../actions/actions.js';
import assign from 'object-assign';

const initialState = {
  width: '600',
  height: '400',
  node:{
    radius:10,
    fill:'#fffffa',
    charge:-1000,
    text:{
      fill:'#1b998b'
    }
  },
  link:{
    distance:50,
    stroke:'#e8eef2'
  }
};

export function options(state = initialState, action){
  return state;
}