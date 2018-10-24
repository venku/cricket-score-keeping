import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './src/App';
import store from './src/store';

const Application = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('cricketscorecard', () => Application);
