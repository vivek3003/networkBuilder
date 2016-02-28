import {ADD_NODE, ADD_LINK, REMOVE_NODE, REMOVE_LINK, GOT_GRAPH, UPDATE_TITLE, LOGOUT, INITITAL_GRAPH, REINIT_GRAPH} from '../actions/actions.js';
import assign from 'object-assign';

export function graph(state = INITITAL_GRAPH, action){
  switch (action.type){
    case GOT_GRAPH:
      return assign({}, state, {
        'id':action.graph_id,
        'title':action.graph.graph.title,
        'links':action.graph.graph.links || [],
        'nodes':action.graph.graph.nodes || []
      });

    case ADD_NODE:
      return assign({}, state, {
        nodes:[...state.nodes, {'label':action.node.label, 'id':action.node.id}]
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

    case UPDATE_TITLE:
      return assign({}, state, {
        title:action.title
      })

    case REINIT_GRAPH:
      return INITITAL_GRAPH;

    case LOGOUT:
      return INITITAL_GRAPH;
  }
  return state;
}