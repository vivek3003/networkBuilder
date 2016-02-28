import React from 'react';
import '../../scss/components/Login.scss';
import {syncUser} from '../actions/actions.js';
import {connect} from 'react-redux';

import {default as fRef} from '../utils/firebase';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  showAuthPopup(e){
    fRef.getRef().authWithOAuthPopup("google", (error, authData) => {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            this.props.dispatch(syncUser(authData))
        }
    });
  }
  render() {
    return (
        <div className='Login'>
          <button onClick={e => this.showAuthPopup()}>Sign In with Google</button>
        </div>
    );
  }
}

export default connect()(Login);