import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
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

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openText: '',
      cipherText: '',
      message: '',
      alphabet: ['a','ą','A','Ą','b','B','c','ć','C','Ć','d','D','e','ę','E','Ę','f','F','g','G','h','H','i','I','j','J','k','K','l','ł','L','Ł','m','M','n','ń','N','Ń','o','ó','O','Ó','p','P','q','Q','r','R','s','ś','S','Ś','t','T','u','U','v','V','w','W','x','X','y','Y','z','ź','ż','Z','Ź','Ż','.',',',' ','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')']
    }
  }
  encryptIt(event) {
    const myKey = this.props.myKey;
    const alphabet = this.state.alphabet;
    const openText = event.target.value.split('');
    let keyCycle = -1;
    const cipherTextArray = openText.map((e, i) => {
      if (i % (myKey.length) == 0) {
        keyCycle++;
      }
      const index1 = alphabet.indexOf(e);
      const index2 = alphabet.indexOf(myKey[i - myKey.length * keyCycle]);
      const cipherLetter = alphabet[(index1 + index2) % alphabet.length];
      return cipherLetter;
    });
    const cipherText = cipherTextArray.join('');
    this.setState({
      openText: event.target.value,
      cipherText: cipherText
    });
  }
  decryptIt(event) {
    const myKey = this.props.myKey;
    const alphabet = this.state.alphabet;
    const encryptedMessage = event.target.value;
    setTimeout(() => {
      let message = '';
      let counter = 0;
      for (let i = 0; i < encryptedMessage.length; i++) {
        if (counter == myKey.length) {
          counter = 0;
        }
        const index1 = alphabet.indexOf(encryptedMessage[i]);
        const index2 = alphabet.indexOf(myKey[counter]);
        let openLetterIndex = (index1 - index2) % alphabet.length;
        if (openLetterIndex < 0) {
          openLetterIndex += alphabet.length;
        }
        message += alphabet[openLetterIndex]
        counter++;
      }
      this.setState({
        message: message
      });
    }, 1000);
  }
  decryptIt_2(event) {
    const myKey = this.props.myKey;
    const alphabet = this.state.alphabet;
    const encryptedMessage = event.target.value;
    let keyCycle = -1;
    const messageArray = encryptedMessage.map((e, i) => {
      if (i % (myKey.length) == 0) {
        keyCycle++;
      }
      const index1 = alphabet.indexOf(e);
      const index2 = alphabet.indexOf(myKey[i - myKey.length * keyCycle]);
      const openLetterIndex = (index1 - index2) % alphabet.length;
      if (openLetterIndex < 0) {
        openLetterIndex += alphabet.length;
      }
      return alphabet[openLetterIndex];
    });
    const message = messageArray.join('');
    this.setState({
      message: message
    });
  }
  render() {
    return (
      <div className="container">
          <div className="encryption-section">
            <div className="encryption-title">
              <span className="encryption-title-title">Encryption</span>
            </div>
            <div className="encryption-field">
              <EncryptionInput onChange={this.encryptIt.bind(this)} />
              <EncryptionOutput cipherText={this.state.cipherText}/>
            </div>
          </div>
          <div className="decryption-section">
            <div className="decryption-title">
              <span className="encryption-title-title">Decryption</span>
            </div>
            <DecryptionField onChange={this.decryptIt_2.bind(this)} message={this.state.message}/>
          </div>
      </div>
    )
  }
}

class EncryptionInput extends React.Component {
  render() {
    return (
      <textarea className="encryption-input" onChange={this.props.onChange}></textarea>
    )
  }
}

class EncryptionOutput extends React.Component {
  render() {
    return (
      <textarea className="encryption-output" value={this.props.cipherText}></textarea>
    )
  }
}

class DecryptionField extends React.Component {
  render() {
    return (
      <textarea className="decryption-field" onChange={this.props.onChange} value={this.props.message}></textarea>
    )
  }
}

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <p>Copyright &#xA9; Bartosz Płatek 2017. All rights reserved.</p>
      </div>
    )
  }
}

class Machine extends React.Component {
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
      <div className="wrapper">
        <Header updateKey={this.updateKey.bind(this)}/>
        <Container myKey={this.state.myKey}/>
        <Footer />
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: <div className="wrapper-loader"><div className="loader">Loading...</div></div>
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        content: <Machine />
      });
    }, 2000);
  }
  render() {
    return this.state.content;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
