import React from 'react';
import ReactDOM from 'react-dom';
import Loader from './loader.jsx';
import AppContainer from './app-container.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: <Loader />
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        content: <AppContainer />
      });
    }, 1500);
  }
  render() {
    return this.state.content;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
