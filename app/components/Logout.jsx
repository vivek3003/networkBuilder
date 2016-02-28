import React from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions/actions.js';
import {default as fRef} from '../utils/firebase';

class Logout extends React.Component {
    constructor(props) {
    super(props);
    }
    handleLogout(){
        fRef.unauth();
        this.props.dispatch(logout());
    }
    render() {
        return (
          <button className='Logout-Btn' onClick={e => this.handleLogout()}>Logout</button>
        );
    }
}
export default connect()(Logout)