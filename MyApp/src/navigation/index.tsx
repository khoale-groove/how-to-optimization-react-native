import React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  HomeScreen,
  ImageConfigScreen,
  ImageDemoScreen,
  FlatlistScreen,
  ReanimatedScreen,
} from '../screens';
import {colors} from '../configs';
import {DataType} from '../../hooks/useData';

type ImageDemoParamsList = {
  selectType: DataType;
  isIntervalUpdate: boolean;
  isMemoize: boolean;
};

export type RootParamList = {
  HomeScreen: undefined;
  FlatlistScreen: undefined;
  ImageConfigScreen: undefined;
  ReanimatedScreen: undefined;
  ImageDemoScreen: ImageDemoParamsList | undefined;
};
export type RootStackScreenProps<Screen extends keyof RootParamList> =
  NativeStackScreenProps<RootParamList, Screen>;

const Stack = createNativeStackNavigator<RootParamList>();

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
        <Stack.Screen
          name="FlatlistScreen"
          component={FlatlistScreen}
          options={{
            title: 'Flatlist',
          }}
        />
        <Stack.Screen
          name="ReanimatedScreen"
          component={ReanimatedScreen}
          options={{
            title: 'Reanimated Example',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
