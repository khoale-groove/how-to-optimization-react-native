import React, {useCallback, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Dimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {colors} from '../configs';
import {
  SimpleButton,
  SimpleImage,
  MemoizeSimpleImage,
  SimpleText,
} from '../components';
import {useData} from '../../hooks/useData';
import {useEffect} from 'react';

export function ImageDemoScreen() {
  // const navigation = useNavigation();
  const [countEffect, setCountEffect] = useState(0);
  const {
    params: {selectType, isIntervalUpdate, isMemoize},
  } = useRoute();
  const data = useData(selectType);

  const ListItem = isMemoize ? MemoizeSimpleImage : SimpleImage;

  const dataList = useMemo(
    () => data.map((i, index) => ({id: index.toString(), uri: i})),
    [data],
  );
  const renderItem: ListRenderItem<typeof dataList[0]> = useCallback(
    ({item}) => <ListItem item={item} />,
    [ListItem],
  );
  const keyExtractor = useCallback((item: typeof dataList[0]) => item.id, []);

  useEffect(() => {
    let id: number = 0;
    if (isIntervalUpdate) {
      id = setInterval(() => {
        setCountEffect(i => i + 1);
      }, 2000);
    }
    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [isIntervalUpdate]);

  return (
    <View style={styles.container}>
      <SimpleText text={`Interval render: ${countEffect}`} />
      <FlatList
        data={dataList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors['blue-900'],
  },
});
