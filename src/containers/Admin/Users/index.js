import React, { Component } from 'react';
import { connect } from "react-redux";

class Users extends Component {
  state = {
    redirectToReferrer: false,
  };

  constructor(props) {
    super(props);
  };

  render() {
    return(
      <p>hello world</p>
    );
  }
}

export default connect(state => ({
  ...state.App.toJS()
}))(Users);