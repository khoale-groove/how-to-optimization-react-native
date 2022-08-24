import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SimpleButton, SimpleText} from '../components';
import Slider from '@react-native-community/slider';

interface IModalContent {
  closeModal: () => void;
  onConfirm: (e: any) => void;
  setShowRender: React.Dispatch<React.SetStateAction<boolean>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  showRender: boolean;
  pageSize: number;
  defaultConfig: IConfig;
}

interface IConfig {
  removeClippedSubviews: boolean;
  maxToRenderPerBatch: number;
  updateCellsBatchingPeriod: number;
  windowSize: number;
  initialNumToRender: number;
}

export function ModalContent({
  closeModal,
  onConfirm,
  showRender,
  setShowRender,
  pageSize: defaultPageSize,
  setPageSize,
  defaultConfig,
}: IModalContent) {
  const [pageSize, _setPageSize] = useState(defaultPageSize);

  const [flatlistConfig, setflatlistConfig] = useState(defaultConfig);

  const setListConfig = useCallback(
    (name: keyof typeof flatlistConfig, value: any) => {
      setflatlistConfig(res => ({...res, [name]: value}));
    },
    [],
  );

  return (
    <>
      <SimpleText text="removeClippedSubviews" />
      <Switch
        onValueChange={value => setListConfig('removeClippedSubviews', value)}
        value={flatlistConfig.removeClippedSubviews}
      />
      <SimpleText
        text={`maxToRenderPerBatch: ${flatlistConfig.maxToRenderPerBatch}`}
      />
      <Slider
        onValueChange={value => setListConfig('maxToRenderPerBatch', value)}
        minimumValue={1}
        maximumValue={100}
        value={flatlistConfig.maxToRenderPerBatch}
        step={1}
        minimumTrackTintColor="#FFFFFF"
      />
      <SimpleText
        text={`updateCellsBatchingPeriod: ${flatlistConfig.updateCellsBatchingPeriod}`}
      />
      <Slider
        onValueChange={value =>
          setListConfig('updateCellsBatchingPeriod', value)
        }
        minimumValue={1}
        maximumValue={1000}
        value={flatlistConfig.updateCellsBatchingPeriod}
        step={1}
        minimumTrackTintColor="#FFFFFF"
      />
      <SimpleText text={`windowSize: ${flatlistConfig.windowSize}`} />
      <Slider
        onValueChange={value => setListConfig('windowSize', value)}
        minimumValue={1}
        maximumValue={50}
        value={flatlistConfig.windowSize}
        step={1}
        minimumTrackTintColor="#FFFFFF"
      />
      <SimpleText
        text={`initialNumToRender: ${flatlistConfig.initialNumToRender}`}
      />
      <Slider
        onValueChange={value => setListConfig('initialNumToRender', value)}
        minimumValue={1}
        maximumValue={50}
        value={flatlistConfig.initialNumToRender}
        step={1}
        minimumTrackTintColor="#FFFFFF"
      />
      <SimpleText text={`Page Size: ${pageSize}`} />
      <Slider
        onValueChange={_setPageSize}
        minimumValue={10}
        maximumValue={1000}
        value={pageSize}
        step={1}
        minimumTrackTintColor="#FFFFFF"
      />
      <SimpleText text="Show Render Number" />
      <Switch onValueChange={setShowRender} value={showRender} />
      <SimpleButton
        title="Confirm"
        onPress={() => {
          setPageSize(pageSize);
          onConfirm(flatlistConfig);
          closeModal();
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});
