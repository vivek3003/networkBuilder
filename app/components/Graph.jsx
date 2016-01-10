import React from 'react';
import dependencyGraph from '../graphs/dependencyGraph';

import '../../scss/components/Graph.scss';


export default class Graph extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    dependencyGraph.init(this.GraphElem, this.props.data, this.props.options);
  }

  componentDidUpdate(){
    dependencyGraph.update(this.props.data, this.props.options);
  }

  render() {
    return (
      <div
        className='Graph'
        ref= {ref => this.GraphElem = ref} ></div>
    );
  }
}
