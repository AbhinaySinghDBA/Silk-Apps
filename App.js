import React, { Component } from 'react';
import {Text,TextInput} from 'react-native';

import Router from './src/routes/Router';

class App extends Component {
  constructor(props){
    super(props);
    Text.defaultProps = Text.defaultProps || {}
    Text.defaultProps.allowFontScaling = false
    TextInput.defaultProps = TextInput.defaultProps || {}
    TextInput.defaultProps.allowFontScaling = false

  }
  
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log('error' + error + " | " + errorInfo)
  }
  render() {
    return (
      <Router />
    );
  }
}
export default App;

