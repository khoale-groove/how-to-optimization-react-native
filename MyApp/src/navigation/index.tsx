import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, ImageConfigScreen, ImageDemoScreen} from '../screens';
import {colors} from '../configs';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerTitleStyle: {color: 'white'},
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: colors['blue-900'],
          },
        }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ImageConfigScreen"
          component={ImageConfigScreen}
          options={{
            title: 'Image configuaration',
          }}
        />
        <Stack.Screen
          name="ImageDemoScreen"
          component={ImageDemoScreen}
          options={{
            title: 'List Images',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
