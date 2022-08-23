import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, ImageScreen, ImageListScreen} from '../screens';

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
          name="ImageListScreen"
          component={ImageListScreen}
          options={{title: 'List Image Items'}}
        />
        <Stack.Screen
          name="ImageScreen"
          component={ImageScreen}
          options={{title: 'Load and Caching Images'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
