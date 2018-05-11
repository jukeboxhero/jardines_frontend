import React, { Component } from 'react';

export default class extends Component {
  render() {
    const { index, onEditCell } = this.props;
    return (
      <a>Edit</a>
    );
  }
}
