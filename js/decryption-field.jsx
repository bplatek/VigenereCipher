import React from 'react';

export default class DecryptionField extends React.Component {
  render() {
    return (
      <textarea className="decryption-field" onChange={this.props.onChange} value={this.props.message} placeholder="Paste encrypted message here"></textarea>
    )
  }
}
