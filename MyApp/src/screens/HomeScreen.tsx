import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../configs';
import {SimpleButton} from '../components';
import {RootStackScreenProps} from '../navigation';

export function HomeScreen({navigation}: RootStackScreenProps<'HomeScreen'>) {
  const moveToFlatlistScreen = useCallback(() => {
    navigation.navigate('FlatlistScreen');
  }, [navigation]);
  const moveToImageConfigScreen = useCallback(() => {
    navigation.navigate('ImageConfigScreen');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SimpleButton
        title="optimize display image"
        onPress={moveToImageConfigScreen}
      />
      <SimpleButton
        title="optimize large list"
        onPress={moveToFlatlistScreen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: colors['blue-900'],
  },
});
