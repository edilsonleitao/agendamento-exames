import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

const App = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" />
    <Routes />
  </NavigationContainer>
);

export default App;
