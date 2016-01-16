import React from 'react';
import {connect} from 'react-redux';
import GenerateInputs from './GenerateInputs.jsx'
import {editOptions} from '../actions/actions.js';

import '../../scss/components/OptionsInputs.scss';

class OptionsInputs extends React.Component {
  constructor(props) {
    super(props);
  }
  updateGraph(){
    var inputs = this._elem.getElementsByTagName('input');
    var options = {};
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var key = input.getAttribute('data-key');

      var value = input.value;
      switch(input.getAttribute('data-type')){
        case 'number':
          value = parseInt(value);
          break;
        case 'boolean':
          value = value == 'true'?true:false;
          break;
      }
      options[key] = value;
    };
    this.props.dispatch(editOptions(options))
  }
  render() {
    var inputs = [];

    for(var key in this.props.options){
      if(typeof this.props.options[key] !== 'object')
        inputs.push(<GenerateInputs
                          key={key}
                          display={key}
                          type={typeof this.props.options[key]}
                          value={this.props.options[key]}/>
                    );
    }

    return (
      <div className='OptionsInputs' ref = { ref => this._elem = ref}>
        <h3>Edit Graph</h3>
        {inputs}
        <br />
        <button className='btn' onClick={e => this.updateGraph(e)} >Update</button>
      </div>
    );
  }
}

export default connect()(OptionsInputs)
