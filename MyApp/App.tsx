import React from 'react';
import MyStack from './src/navigation';
import {View} from 'react-native';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <MyStack />
    </View>
  );
}
