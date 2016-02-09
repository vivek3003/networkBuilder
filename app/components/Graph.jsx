import React from 'react';
import {connect} from 'react-redux';
import {init} from '../actions/actions.js';

import dependencyGraph from '../graphs/dependencyGraph';

import '../../scss/components/Graph.scss';


class Graph extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    dependencyGraph.init(this.GraphElem, this.props.data, this.props.options);
    this.props.dispatch(init());
  }

  componentDidUpdate(){
    console.log('PROPS', this.props.data);
    dependencyGraph.update(this.props.data, this.props.options);
  }

  render() {
    return (
      <div
        id='dep_graph'
        className='Graph'
        ref= {ref => this.GraphElem = ref} >
      </div>
    );
  }
}

export default connect()(Graph)
