import React from 'react';
import Header from './header.jsx';
import CipherMachine from './cipher-machine.jsx';
import Footer from './footer.jsx';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myKey: ''
    }
  }
  updateKey(event) {
    this.setState({
      myKey: event.target.value
    });
  }
  render() {
    return (
      <div className="container">
        <Header updateKey={this.updateKey.bind(this)}/>
        <CipherMachine myKey={this.state.myKey}/>
        <Footer />
      </div>
    )
  }
}
