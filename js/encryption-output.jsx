import React from 'react';

export default class EncryptionOutput extends React.Component {
  render() {
    return (
      <textarea className="encryption-output" value={this.props.cipherText}></textarea>
    )
  }
}
