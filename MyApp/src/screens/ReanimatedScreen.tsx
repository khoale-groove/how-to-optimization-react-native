import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {RootStackScreenProps} from '../navigation';
import {colors} from '../configs';
import {
  TapGestureHandler,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

export function ReanimatedScreen({}: RootStackScreenProps<'ReanimatedScreen'>) {
  const pressed = useSharedValue(false);
  const startingPosition = 0;
  const x1 = useSharedValue(startingPosition);
  const y1 = useSharedValue(startingPosition);

  const eventHandler1 = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
    },
    onActive: (event, ctx) => {
      x1.value = startingPosition + event.translationX;
      y1.value = startingPosition + event.translationY;
    },
    onFail(event, context) {
      pressed.value = false;
    },
    onEnd: (event, ctx) => {
      x1.value = withSpring(startingPosition, {}, () => {
        pressed.value = false;
      });
      y1.value = withSpring(startingPosition);
    },
  });

  const uas1 = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? colors['orange-600'] : '#001972',
      transform: [
        {scale: pressed.value ? 1.1 : 1},
        {translateX: x1.value},
        {translateY: y1.value},
      ],
    };
  }, [pressed, x1, y1]);

  const pressed2 = useSharedValue(false);
  const x2 = useSharedValue(startingPosition);
  const y2 = useSharedValue(startingPosition);

  const eventHandler2 = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed2.value = true;
    },
    onActive: (event, ctx) => {
      x2.value = startingPosition + event.translationX;
      y2.value = startingPosition + event.translationY;
    },
    onFail(event, context) {
      pressed2.value = false;
    },
    onEnd: (event, ctx) => {
      x2.value = withSpring(startingPosition, {}, () => {
        pressed2.value = false;
      });
      y2.value = withSpring(startingPosition);
    },
  });

  const uas2 = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed2.value ? colors['orange-600'] : '#001972',
      transform: [
        {scale: pressed2.value ? 1.1 : 1},
        {translateX: x2.value},
        {translateY: y2.value},
      ],
    };
  }, [pressed, x2, y2]);

  const pressed3 = useSharedValue(false);
  const x3 = useSharedValue(startingPosition);
  const y3 = useSharedValue(startingPosition);

  const eventHandler3 = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed3.value = true;
      ctx.startX = x3.value;
      ctx.startY = y3.value;
    },
    onActive: (event, ctx) => {
      x3.value = ctx.startX + event.translationX;
      y3.value = ctx.startY + event.translationY;
    },
  });

  const uas3 = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed3.value ? colors['orange-600'] : '#001972',
      transform: [
        {scale: pressed3.value ? 1.1 : 1},
        {translateX: x3.value},
        {translateY: y3.value},
      ],
    };
  }, [pressed, x3, y3]);

  const rotation = useSharedValue(0);
  const ANGLE = 10;
  const eventHandler4 = useAnimatedGestureHandler({
    onStart(event, context) {
      rotation.value = withSequence(
        withTiming(-10, {duration: 50}),
        withRepeat(withTiming(ANGLE, {duration: 100}), 16, true),
        withTiming(0, {duration: 50}),
      );
    },
  });

  const ringStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });

  return (
    <View style={[styles.container, {paddingBottom: 80}]}>
      <View style={styles.row}>
        <PanGestureHandler onGestureEvent={eventHandler1}>
          <Animated.View style={[styles.ball, uas1]} />
        </PanGestureHandler>
        <PanGestureHandler onGestureEvent={eventHandler2}>
          <Animated.View style={[styles.ball, uas2]} />
        </PanGestureHandler>
      </View>
      <View style={styles.row}>
        <TapGestureHandler onGestureEvent={eventHandler4}>
          <Animated.View style={[styles.square, ringStyle]} />
        </TapGestureHandler>
        <PanGestureHandler onGestureEvent={eventHandler3}>
          <Animated.View style={[styles.ball, uas3]} />
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: colors['blue-900'],
  },
  row: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ball: {
    width: 60,
    height: 60,
    borderRadius: 999,
    backgroundColor: '#001972',
  },
  square: {
    width: 60,
    height: 60,
    backgroundColor: colors['orange-600'],
    borderRadius: 10,
  },
});
