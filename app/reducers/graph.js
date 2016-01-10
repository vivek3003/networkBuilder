import {ADD_NODE, ADD_LINK, REMOVE_NODE, REMOVE_LINK } from '../actions/actions.js';
import assign from 'object-assign';


const initialState = {
  nodes : [
  ],

  links : [
  ]
}

export function graph(state = initialState, action){
  switch (action.type){
    case ADD_NODE:
      return assign({}, state, {
        nodes:[...state.nodes, action.node]
      })

    case ADD_LINK:
      return assign({}, state, {
        links:[...state.links, action.link]
      })

    case REMOVE_NODE:
      var newLinks = state.links.filter(function(link, i){
        if(link.source == action.index || link.target == action.index){
          return false;
        }
        return true;
      }).map(function(link, i){
          var newLink = {
            'source':link.source > action.index?link.source - 1:link.source,
            'target':link.target > action.index?link.target - 1:link.target
          }
          return assign({}, link, newLink)
      });

      return assign({}, state, {
        nodes:[...state.nodes.slice(0, action.index), ...state.nodes.slice(action.index+1)],
        links:newLinks
      })

    case REMOVE_LINK:
      return assign({}, state, {
        links:[...state.links.slice(0, action.index), ...state.links.slice(action.index+1)]
      })
  }
  return state;
}