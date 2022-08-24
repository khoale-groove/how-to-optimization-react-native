import React, {memo, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SimpleText} from './SimpleText';

const isEqual = require('react-fast-compare');
const {width: screenWidth} = Dimensions.get('screen');

interface Props {
  item: {id: string; uri: string};
  showRender?: boolean;
}

export function SimpleImage(props: Props) {
  const {item, showRender = true} = props;
  const [countRender, setCountRender] = useState(0);

  useEffect(() => {
    if (showRender) {
      setCountRender(c => c + 1);
    }
    return () => {};
  }, [props]);

  return (
    <View style={styles.item}>
      <FastImage source={{uri: item.uri}} style={styles.image} />
      {showRender && (
        <View style={styles.absolute}>
          <SimpleText preset="h5" isBold text={countRender.toString()} />
        </View>
      )}
    </View>
  );
}

function areEqual(nexProps, prevProps) {
  return isEqual(nexProps, prevProps);
}

export const MemoizeSimpleImage = memo(SimpleImage, areEqual);

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    margin: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: screenWidth - 16,
    height: 160,
  },
  absolute: {
    position: 'absolute',
    right: 30,
    top: 10,
    backgroundColor: 'black',
    paddingHorizontal: 50,
  },
});
