import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import TaskScreen from './screens/TaskScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="TaskScreen"
          component={TaskScreen}
          options={{ title: 'Tasks' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
