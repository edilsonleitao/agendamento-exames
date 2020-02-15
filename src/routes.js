import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Exames from './pages/Exames';
import Solicitacoes from './pages/Solicitacoes';

const Stack = createStackNavigator();

const Routes = ({ addExames }) => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerStyle: { backgroundColor: '#DF5C48' },
      headerTintColor: '#fff',
    }}>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerBackTitleVisible: false, headerTitle: '' }}
    />
    <Stack.Screen
      name="Solicitações"
      component={Solicitacoes}
      options={{ gestureEnabled: false, headerLeft: false }}
    />
    <Stack.Screen name="Agendar" component={Exames} />
  </Stack.Navigator>
);

export default Routes;
