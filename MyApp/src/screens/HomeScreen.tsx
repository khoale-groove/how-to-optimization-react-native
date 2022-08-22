import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {classnames as cn} from 'utilstyle-react-native';
import FastImage from 'react-native-fast-image';
import {useData} from '../../hooks/useData';

export function HomeScreen() {
  const data = useData();
  const navigation = useNavigation();
  const moveToFlatlist = () => navigation.navigate('FlatlistScreen');

  useEffect(() => {
    FastImage.preload(data.map(uri => ({uri})));
    return () => {};
  }, [data]);

  return (
    <View style={[cn('flex-1', 'px-4'), {paddingTop: 100}]}>
      <TouchableOpacity
        style={[
          {backgroundColor: '#03174C'},
          cn('items-center', 'p-4', 'rounded-xl'),
        ]}
        onPress={moveToFlatlist}>
        <Text style={[cn('text-white', 'text-2xl')]}>Flatlist</Text>
      </TouchableOpacity>
    </View>
  );
}
