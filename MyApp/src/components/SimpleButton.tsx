import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../configs';

interface SimpleButtonProps {
  title: string;
  onPress: () => void;
}

export function SimpleButton({title, onPress}: SimpleButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={styles.container}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors['black-200'],
    margin: 4,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
