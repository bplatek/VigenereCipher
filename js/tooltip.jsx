import React from 'react';

export default class Tooltip extends React.Component {
  render() {
    return (
      <div className={this.props.className}>{this.props.text}</div>
    )
  }
}
