import React from 'react';

export default class EncryptionInput extends React.Component {
  render() {
    return (
      <textarea className="encryption-input" onChange={this.props.onChange} placeholder="Enter your text here"></textarea>
    )
  }
}
