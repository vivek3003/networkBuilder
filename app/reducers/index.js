import {graph} from './graph';
import {options} from './options';

import { combineReducers } from 'redux';

const graphApp = combineReducers({
  graph,
  options
})

//export default graphApp

export default {
    graph,
    options
}