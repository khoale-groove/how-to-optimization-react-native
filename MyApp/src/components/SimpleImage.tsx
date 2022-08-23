import React, {memo, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SimpleText} from './SimpleText';

const {width: screenWidth} = Dimensions.get('screen');

interface Props {
  item: {id: string; uri: string};
}

export function SimpleImage(props: Props) {
  const {item} = props;
  const [countRender, setCountRender] = useState(0);

  useEffect(() => {
    setCountRender(c => c + 1);
    return () => {};
  }, [props]);

  return (
    <View style={styles.item}>
      <FastImage source={{uri: item.uri}} style={styles.image} />
      <View style={styles.absolute}>
        <SimpleText preset="h5" isBold text={countRender} />
      </View>
    </View>
  );
}

function areEqual(nexProps, prevProps) {
  return nexProps.item.uri === prevProps.item.uri;
}

export const MemoizeSimpleImage = memo(SimpleImage, areEqual);

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: screenWidth - 16,
    height: 200,
    borderRadius: 10,
  },
  absolute: {
    position: 'absolute',
    right: 30,
    top: 10,
    backgroundColor: 'black',
    paddingHorizontal: 50,
  },
});
