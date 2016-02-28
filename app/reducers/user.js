import assign from 'object-assign';
import {RESTORE_USER_DATA, LOGOUT, GOT_LIST} from '../actions/actions.js';

const initialState = {
  'is_logged_in':false,
  'data':{},
  'uid':'',
  'list':[]
};

export function user(state = initialState, action){
    switch(action.type){
    case RESTORE_USER_DATA:
        return assign({}, state, {
            'is_logged_in':true,
            'uid':action.uid,
            'data':action.user.data,
            'list':action.user.list.slice()
        });

    case LOGOUT:
        return initialState

    case GOT_LIST:
      return assign({}, state, {
        'list':action.list
      })

    default:
        return state;
    }
}