import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header-logo">
          <span>&Xi;</span>
        </div>
        <div className="header-key">
          <span>KEY:</span><input id="keyInput" type="text" name="key" onChange={this.props.updateKey} />
        </div>
      </div>
    )
  }
}
