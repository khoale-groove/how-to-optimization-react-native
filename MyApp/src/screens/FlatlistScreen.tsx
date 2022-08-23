import React, {useCallback, useMemo} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useData} from '../../hooks/useData';
import FastImage from 'react-native-fast-image';

export function FlatlistScreen() {
  const data = useData();
  const dataList = useMemo(
    () => data.map((i, index) => ({id: i, uri: i})),
    [data],
  );
  const renderItem = useCallback(({item}) => {
    return (
      <View style={[cn('px-6', 'py-3', 'border-2', 'border-amber')]}>
        <FastImage
          source={{uri: item.uri}}
          style={[
            cn('shadow-lg', 'rounded-xl', 'w-full'),
            {width: 320, minHeight: 160},
          ]}
        />
      </View>
    );
  }, []);

  return (
    <FlatList
      data={dataList}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    
  }
})
