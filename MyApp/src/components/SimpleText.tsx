import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';

export function SimpleText({preset = 'h5', text, isBold}: SimpleTextProps) {
  const fonsSizeStyle = {
    fontSize: FRONT_SIZE[presets.indexOf(preset)],
    fontWeight: isBold ? '700' : '400',
  } as TextStyle;

  return <Text style={[fonsSizeStyle, styles.text]}>{text}</Text>;
}

interface SimpleTextProps {
  preset?: Preset;
  text: string;
  isBold?: boolean;
}

type Preset = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const presets = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const FRONT_SIZE = [28, 24, 22, 18, 16, 14];

const styles = StyleSheet.create({
  text: {color: 'white', paddingBottom: 4},
});
