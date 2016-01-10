import expect from 'expect'
import {graph} from '../graph'
import deepFreeze from 'deep-freeze';

describe('graph reducer', () => {
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
})