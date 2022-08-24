import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../configs';
import {SimpleButton, SimpleText} from '../components';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import BouncyCheckbox, {
  IBouncyCheckboxProps,
} from 'react-native-bouncy-checkbox';
import {DataType, dataTypeValues, useData} from '../../hooks/useData';
import FastImage from 'react-native-fast-image';
import {RootStackScreenProps} from '../navigation';

export function ImageConfigScreen({
  navigation,
}: RootStackScreenProps<'ImageConfigScreen'>) {
  const [selectType, setSelectType] = useState<DataType>(dataTypeValues[0]);
  const data = useData(selectType);
  const [isIntervalUpdate, setIntervalUpdate] = useState(false);
  const [isMemoize, setIsMemoize] = useState(false);
  const autoPreloadRef = useRef<BouncyCheckbox | null>(null);
  const [isAutoPreload, setAutoPreload] = useState(false);

  const handleClearCache = useCallback(() => {
    autoPreloadRef.current?.props.onPress &&
      autoPreloadRef.current?.props.onPress(false);
    autoPreloadRef.current?.setState({checked: false});
    Promise.all([FastImage.clearDiskCache(), FastImage.clearMemoryCache()]);
  }, []);

  const moveToDemo = useCallback(() => {
    navigation.navigate('ImageDemoScreen', {
      isIntervalUpdate,
      isMemoize,
      selectType,
    });
  }, [navigation, selectType, isIntervalUpdate, isMemoize]);

  useEffect(() => {
    if (isAutoPreload) {
      FastImage.preload(data.map(i => ({uri: i})));
    }
    return () => {};
  }, [isAutoPreload, selectType, data]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SimpleText preset="h3" text="Select resolution" isBold />
        <BouncyCheckboxGroup
          initial={0}
          data={staticCheckBoxes}
          style={{flexDirection: 'column'}}
          onChange={(selectedItem: ICheckboxButton) => {
            const text = selectedItem.text as DataType;
            setSelectType(text);
          }}
        />
        <View style={{marginTop: 30}}>
          <SimpleText preset="h3" text="Preload and Cache images" isBold />
          <BouncyCheckbox
            size={30}
            ref={ref => (autoPreloadRef.current = ref)}
            text="Automatic preload images"
            textStyle={{
              textDecorationLine: 'none',
              color: isAutoPreload ? 'white' : 'gray',
            }}
            onPress={(isChecked: boolean) => setAutoPreload(isChecked)}
            style={{marginVertical: 10}}
          />
          <SimpleButton
            title="Clear disk cache & memory cache"
            onPress={handleClearCache}
          />
        </View>
        <BouncyCheckbox
          size={30}
          text="memoize item"
          textStyle={{
            textDecorationLine: 'none',
            color: isMemoize ? 'white' : 'gray',
          }}
          onPress={(isChecked: boolean) => setIsMemoize(isChecked)}
          style={{marginVertical: 20}}
        />
        <BouncyCheckbox
          size={30}
          text="With interval update screen"
          textStyle={{
            textDecorationLine: 'none',
            color: isIntervalUpdate ? 'white' : 'gray',
          }}
          onPress={(isChecked: boolean) => setIntervalUpdate(isChecked)}
          style={{marginVertical: 20}}
        />
      </ScrollView>
      <SimpleButton title="Next" onPress={moveToDemo} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingTop: 40,
    backgroundColor: colors['blue-900'],
  },
});

interface CheckboxButton extends IBouncyCheckboxProps {
  text: DataType;
  id: number;
}

const staticCheckBoxes: CheckboxButton[] = [
  {
    id: 0,
    text: dataTypeValues[0],
    size: 30,
    textStyle: {
      textDecorationLine: 'none',
      color: 'white',
    },
    style: {marginVertical: 4},
  },
  {
    id: 1,
    text: dataTypeValues[1],
    size: 30,
    textStyle: {
      textDecorationLine: 'none',
      color: 'white',
    },
    style: {marginVertical: 4},
  },
  {
    id: 2,
    text: dataTypeValues[2],
    size: 30,
    textStyle: {
      textDecorationLine: 'none',
      color: 'white',
    },
    style: {marginVertical: 4},
  },
  {
    id: 3,
    text: dataTypeValues[3],
    size: 30,
    textStyle: {
      textDecorationLine: 'none',
      color: 'white',
    },
    style: {marginVertical: 4},
  },
];
