import {default as fRef} from '../utils/firebase';

export const logger = store => next => action => {
  console.log('========================')
  console.log('dispatching', action)
  let result = next(action)
  //console.log('next state', window.JSON.stringify(store.getState()))
  console.log('next state JSON',store.getState())
  console.log('========================')
  return result
}

export const syncGraph = store => next => action => {
  let result = next(action);

  setTimeout(function(){
    if(fRef.isLoggedIn()){
        var graph = store.getState()['graph'];
        var options = store.getState()['options']
        if(graph.id != ''){
            var graphObj = {
                'id':graph.id,
                'nodes':graph.nodes,
                'links':graph.links,
                'title':graph.title
            }
            fRef.getGraphRef(graph.id)
                .update({
                    'graph':graphObj,
                    'options':options
                })
        }
    }
  })
  return result
}
// export const localStorer = store => next => action => {
//   let result = next(action)
//   window.localStorage['state'] =  window.JSON.stringify(store.getState());
//   return result
// }