export const logger = store => next => action => {
  console.log('========================')
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.log('========================')
  return result
}

export const localStorer = store => next => action => {
  let result = next(action)
  window.localStorage['state'] =  window.JSON.stringify(store.getState());
  return result
}