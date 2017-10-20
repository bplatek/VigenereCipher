import React from 'react';
import EncryptionInput from './encryption-input.jsx';
import EncryptionOutput from './encryption-output.jsx';
import DecryptionField from './decryption-field.jsx';
import Button from './button.jsx';
import Bulb from './bulb.jsx';

export default class CipherMachine extends React.Component {
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
    const openText = event.target.value;
    const openTextArray = event.target.value.split('');
    let keyCycle = -1;
    const cipherTextArray = openTextArray.map((e, i) => {
      if (i % (myKey.length) == 0) {
        keyCycle++;
      }
      const index1 = alphabet.indexOf(e);
      const index2 = alphabet.indexOf(myKey[i - myKey.length * keyCycle]);
      const cipherLetter = alphabet[(index1 + index2) % alphabet.length];
      return cipherLetter;
    });
    const cipherText = cipherTextArray.join('');
    for (let i = 0; i < 4; i++) {
      if (i == 4) {
        setTimeout(() => {
          this.setState({
            openText: openText,
            cipherText: cipherText
          });
        }, 50 * i);
      } else {
        setTimeout(() => {
          const number = Math.round(Math.random() * (this.state.alphabet.length - 1));
          this.setState({
            openText: openText,
            cipherText: cipherText.slice(0, -1) + alphabet[number]
          });
        }, 50 * i);
      }
    }
  }
  decryptIt(event) {
    const myKey = this.props.myKey;
    const alphabet = this.state.alphabet;
    const encryptedMessage = event.target.value.split('');
    let keyCycle = -1;
    for (let i = 0; i < 15; i++) {
      if (i == 14) {
        setTimeout(() => {
          const messageArray = encryptedMessage.map((e, i) => {
            if (i % (myKey.length) == 0) {
              keyCycle++;
            }
            const index1 = alphabet.indexOf(e);
            const index2 = alphabet.indexOf(myKey[i - myKey.length * keyCycle]);
            let openLetterIndex = (index1 - index2) % alphabet.length;
            if (openLetterIndex < 0) {
              openLetterIndex += alphabet.length;
            }
            return alphabet[openLetterIndex];
          });
          const message = messageArray.join('');
          this.setState({
            message: message
          });
        }, 50 * i);
      } else {
        setTimeout(() => {
          const messageArray = encryptedMessage.map((e, i) => {
            const number = Math.round(Math.random() * (this.state.alphabet.length - 1));
            return alphabet[number];
          });
          const message = messageArray.join('');
          this.setState({
            message: message
          });
        }, 50 * i);
      }
    }
  }
  copyToClipboard(event) {
    document.querySelector(".encryption-output").select();
    document.execCommand("copy");
  }
  render() {
    return (
      <div className="machine-wrapper">
          <div className="encryption-section">
            <div className="encryption-title">
              <span className="encryption-title-title">Encryption</span>
            </div>
            <div className="encryption-field">
              <EncryptionInput onChange={this.encryptIt.bind(this)} />
              <div className="char-counter">{this.state.openText.length}/1000</div>
              <EncryptionOutput cipherText={this.state.cipherText}/>
              <Button className="button copy-button" text="Copy" onClick={this.copyToClipboard.bind(this)}/>
            </div>
          </div>
          <div className="decryption-section">
            <div className="decryption-title">
              <span className="encryption-title-title">Decryption</span>
            </div>
            <DecryptionField onChange={this.decryptIt.bind(this)} message={this.state.message}/>
          </div>
      </div>
    )
  }
}
