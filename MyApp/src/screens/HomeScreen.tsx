import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../configs';
import {SimpleButton} from '../components';

export function HomeScreen() {
  const navigation = useNavigation();
  const moveToImageScreen = () => navigation.navigate('ImageScreen');

  return (
    <View style={styles.container}>
      <SimpleButton
        title="How to optimize loading image"
        onPress={moveToImageScreen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 100,
  },
  button: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
});
