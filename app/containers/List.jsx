import React from 'react';
import {Link} from 'react-router';

export default class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <p>This is a list of all your graphs</p>
            <p><Link to="/draw">Start New</Link></p>
        </div>
    );
  }
}
