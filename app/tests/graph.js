import expect from 'expect';
import {graph} from '../reducers/graph';
import deepFreeze from 'deep-freeze';

describe('REDUCER:graph, in reducers/graph', () => {
  const prevState = {
    nodes : [
      {'label':'A','id':1}, {'label':'B','id':2}, {'label':'C','id':3}
    ],

    links : [
      {'source':0, 'target':1},{'source':0, 'target':2}
    ]
  }

  deepFreeze(prevState);

  const expected = {
    nodes : [
      {'label':'A','id':1}, {'label':'C','id':3}
    ],

    links : [
      {'source':0, 'target':1}
    ]
  }

  const expected_1 = {
    nodes : [
      {'label':'B','id':2}, {'label':'C','id':3}
    ],

    links : [
    ]
  }

  const expected_2 = {
    nodes : [
      {'label':'A','id':1}, {'label':'B','id':2}
    ],

    links : [
      {'source':0, 'target':1}
    ]
  }

  const stateAfterNodeAdd = {
    nodes : [
      {'label':'A','id':1}, {'label':'B','id':2}, {'label':'C','id':3}, {'label':'D','id':4}
    ],

    links : [
      {'source':0, 'target':1},{'source':0, 'target':2}
    ]
  }

  it('should handle REMOVE_NODE', () => {
    expect(
      graph(prevState, {
        type: 'REMOVE_NODE',
        index: 1
      })
    ).toEqual(
      expected
    )

    expect(
      graph(prevState, {
        type: 'REMOVE_NODE',
        index: 0
      })
    ).toEqual(
      expected_1
    )

    expect(
      graph(prevState, {
        type: 'REMOVE_NODE',
        index: 2
      })
    ).toEqual(
      expected_2
    )
  })

  it('should handle ADD_NODE', () => {
    // Deliberatly adding extra keys to node object
    expect(
      graph(prevState, {
        type: 'ADD_NODE',
        node:{
          'id':4,
          'px': 299.9801854420128,
          'py': 199.99363977406674,
          'weight': 0,
          'x': 299.9802907303252,
          'y': 199.9936735703015,
          'label':'D'
        }
      })
    ).toEqual(
      stateAfterNodeAdd
    )

    expect(
      graph(prevState, {
        type: 'REMOVE_NODE',
        index: 0
      })
    ).toEqual(
      expected_1
    )

    expect(
      graph(prevState, {
        type: 'REMOVE_NODE',
        index: 2
      })
    ).toEqual(
      expected_2
    )
  })
})