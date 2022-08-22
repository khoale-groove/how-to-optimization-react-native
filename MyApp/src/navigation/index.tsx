import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, FlatlistScreen} from '../screens';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FlatlistScreen"
          component={FlatlistScreen}
          options={{title: 'Flatlist Screen'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
