import React from 'react';
import Graph from '../components/Graph.jsx';
import DataInputs from '../components/DataInputs.jsx';
import OptionsInputs from '../components/OptionsInputs.jsx'

import {connect} from 'react-redux';

import '../../scss/main.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='Graph-Container'>
            <Graph
                data = {this.props.graph}
                options = {this.props.options}
            />
        </div>
        <div className='Inputs-Container'>
            <DataInputs data = {this.props.graph}/>
            <OptionsInputs  options = {this.props.options}/>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Home)