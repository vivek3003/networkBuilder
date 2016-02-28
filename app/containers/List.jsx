import React from 'react';
import {connect} from 'react-redux';

import Logout from '../components/Logout.jsx';
import {createGraph, getList} from '../actions/actions.js';

import '../../scss/components/List.scss';

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(getList());
  }

  render() {
    var user = this.props.user.data;
    var list = this.props.user.list.map(function(graph, index){
                return (<p key={graph.id}><a href={`${graph.url}`} >{graph.title}</a></p>)
              })

    return (
        <div className='List'>
          <div className='List-Card'>
            <img src={user.picture} />
            <p>Hey {user.given_name}!!<br />This is a list of all your graphs</p>
            {list}
            <p><a onClick={e =>this.props.dispatch(createGraph())} className='Btn-Create'>Create New Graph</a></p>
            <p><Logout /></p>
          </div>
        </div>
    );
  }
}

export default connect(state => state)(List)
