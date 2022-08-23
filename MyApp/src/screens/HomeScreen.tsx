import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../configs';
import {SimpleButton} from '../components';

export function HomeScreen() {
  const navigation = useNavigation();

  const moveToImageConfigScreen = useCallback(() => {
    navigation.navigate('ImageConfigScreen');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SimpleButton
        title="optimize display image"
        onPress={moveToImageConfigScreen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 100,
    backgroundColor: colors['blue-900'],
  },
});
