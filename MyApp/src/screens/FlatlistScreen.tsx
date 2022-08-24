import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import {colors} from '../configs';
import {MemoizeSimpleImage, SimpleButton} from '../components';
import {RootStackScreenProps} from '../navigation';
import {useInfiniteData} from '../../hooks/useData';
import {Modalize, useModalize} from 'react-native-modalize';
import {ModalContent} from './ModalContent';

const {height: screenHeight} = Dimensions.get('screen');

export function FlatlistScreen({
  navigation,
}: RootStackScreenProps<'FlatlistScreen'>) {
  // modal
  const {ref: modalRef, open, close} = useModalize();
  const [flatlistConfig, setflatlistConfig] = useState({
    removeClippedSubviews: false,
    maxToRenderPerBatch: 10,
    updateCellsBatchingPeriod: 50,
    windowSize: 21,
    initialNumToRender: 10,
  });

  // list
  const [showRender, setShowRender] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const {data, fetchData, loading, resetData} = useInfiniteData(
    'medium',
    pageSize,
  );
  const dataList = useMemo(
    () =>
      [...data].map((i, ix) => ({
        id: ix.toString(),
        uri: i,
      })),
    [data],
  );

  const renderItem: ListRenderItem<typeof dataList[0]> = useCallback(
    ({item}) => <MemoizeSimpleImage item={item} showRender={showRender} />,
    [showRender],
  );
  const keyExtractor = useCallback((item: typeof dataList[0]) => item.id, []);

  return (
    <View style={styles.container}>
      <SimpleButton title="Open Setting" onPress={open} />
      <FlatList
        data={dataList}
        indicatorStyle="white"
        renderItem={renderItem}
        contentContainerStyle={styles.contentList}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        onEndReachedThreshold={0.3}
        onEndReached={fetchData}
        ListFooterComponent={() => (
          <View>{loading && <ActivityIndicator size={'small'} />}</View>
        )}
        {...flatlistConfig}
      />
      <Modalize
        ref={modalRef}
        snapPoint={screenHeight * 0.7}
        modalStyle={[styles.container, {padding: 16, paddingTop: 30}]}>
        <ModalContent
          closeModal={close}
          onConfirm={values => {
            setflatlistConfig(values);
            resetData();
          }}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setShowRender={setShowRender}
          showRender={showRender}
          defaultConfig={flatlistConfig}
        />
      </Modalize>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 50,
    backgroundColor: colors['blue-900'],
  },
  contentList: {
    paddingBottom: 30,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: colors.amber,
  },
  row: {
    flexDirection: 'row',
  },
});
