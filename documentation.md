## How to optimize a mobile app made by React Native

### Overview

#### JavaScript thread

#### UI frame rate

### 1. Basic

#### 1.1. Remove all console.log statements

We use console to debug a mobile app in development environment. After that, we have to remove for performing the app in production.

- use **lint code** to detect all statements
- use babel plugins to remove all statements from production such as `babel-plugin-transform-remove-console`

#### 1.2. Avoid use use of ScrollView to render huge lists

`ScrollView` is simple to implement. However, it renders all children at once. Therefore, we should use `Flatlist`, `SectionList` with huge data.

```tsx
// bad
<ScrollView>
  {items.map(item => {
    return <Item key={item.id.toString()} name={item.name} />;
  })}
</ScrollView>

// good
<FlatList
  data={items}
  keyExtractor={item => `${items.id}`}
  renderItem={({ item }) => <Item name={item.name} />}
/>
```

#### 1.3. Avoid arrow functions

Don’t use arrow functions as callbacks in your functions to render views. With use arrow function,  each renders generates a new instance of function and finally the child component which used it will be rendered because of detecting new props.

```tsx
// bad
function Todo() {
	function addTodo() {
		// ...
	}
	return (<Pressable onPress={() => addTodo()} />)
}

// good
function Todo() {
	function addTodo() {
		// ...
	}
	return (<Pressable onPress={addTodo} />)
}
```

#### 1.4. Prevent double press button

- debounce press handling
- make a overlay to prevent double press

#### 1.5. Avoid render heavy component during navigator transitions

Heavy component such as huge lists will lead to high memories on JS thread. That's why we should wait for transitions will be complete.

Fortunately, the `useIsFocused` hook provides its status.

```tsx
import { useIsFocused } from '@react-navigation/native';

// ...

function ProfileListScreen() {
  const isFocused = useIsFocused();
	//  return list;
}
```

#### 1.6. Performance Monitoring

- Firebase

- Sentry

### 2. Memoize expensive computations with React Hooks

#### 2.1. useMemo

Returns a **memoized** value of a function. It should be used only when we want perform expensive computations such as handling huge data, object...

```tsx
const memoizedResult = useMemo(() => compute(a, b), [a, b]);
```

when next renderings, the dependencies don't change, then `useMemo()` *doesn't invoke* `compute` but returns the memoized value. By using `useMemo`, we can **memoize** the results.

For example,

```tsx
const data = [
  {id: 1, value: 1},
  // ...
	{id: 10000, value: 10000}
];

const memoizeData = useMemo(() => {
  const filterData = data.filter(...);
	const mappedData = filterData.map(...);
  // ...
  const finalValue = mappedData.reduce(...);
 	return finalValue;
}, [data]);
```



#### 2.2. useCallback

Returns a **memoized** callback. Similar to `useMemo`, it used  but it returns a memoized callback. It only is changed if one of dependencies has changed.

```tsx
const todoCallback = useCallback(
  () => {
    doSomething(a, b)
  },
  [a, b],
);
...
return(<Button onPress={todoCallback}/>);
...
```

Return a callback which depends on its parameter. 

```tsx
const onChangeValue = useCallback(
	(fieldId) => (newValue) => {
    handleChangeValue(fieldId, newValue)
  },
  []
);
```

It is useful when passing callbacks to child component to prevent unnecessary renders.

```tsx
export default function Maker() {
 const handleTakeMaker = useCallback(() => {
		// making point
  }, []);
  return (
    <View style={styles.container}>
      <MakerItem onPress={handleTakeMaker} />
    </View>
  );
}
```

#### 2.3. memo

`memo` only checks for prop changes. This means that React will skip rendering the component, and reuse the last rendered result.

```tsx
function Movie({ title }) {
  return (
    <Text>Movie title: {title}</Text>
  );
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export const MemoizedMovie = React.memo(Movie, areEqual);
// By default it will only shallowly compare objects in the props object.
// export const MemoizedMovie = React.memo(Movie);
```



### 3. Image

#### 3.1. Use smaller resolution images

It is important to optimize images to improve RN app's performance. Its make reduce download time and memory usage on the device. In other way, we should resize the image size before loading them on the app.

Recommend: [Cloudinary](https://cloudinary.com/)

#### 3.2. Use format PNG instead of JPG

Using PNG files as a static image of your react native app will also lead you to the problem of memory leaking. This is because react native use `fresco library` to render and display images. This can be solved by using JPG images which will reduce the memory footprint as a result.

#### 3.3. Caching image

Caching is another solution to image problems in a React Native app. It saves the images locally the first time they are loaded and uses the local cache in the subsequent requests.

Highly recommending to use [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image) for caching images on react native app. 

#### 3.4. Prefetch image if you can

`Image.prefetch` or `FastImage.preload` for later display by downloading it to the disk cache.

### 4. Large List

#### 4.1. Infinite scroll pagination and pull to refresh

```tsx
<Flatlist
	data={data}
  renderItem={renderItem}
  onEndReachedThreshold={0.2}
	onEndReached={onEndReached}
  ...
  refreshing={refreshing}
  onRefresh={onRefresh}
/>
```

`onEndReachedThreshold` is used to determine how far the distance from the bottom in order to trigger `onEndReached`.

 `onRefresh` will be called when pulling the list.

#### 4.3. Content loader

To feel UI smoothly, we should create a loader component or a progressive image before load a component completely.

![Example's react-content-loader](https://user-images.githubusercontent.com/4838076/34308760-ec55df82-e735-11e7-843b-2e311fa7b7d0.gif)

refs: https://skeletonreact.com/

#### 4.4. Optimizing Flatlist Configuration

refs: https://reactnative.dev/docs/optimizing-flatlist-configuration

#### 5. Animation

#### 5.1. InteractionManager

The JavaScript thread is responsible for controlling navigator animations. When rendering a new screen while an animation is running on the JavaScript thread, it results in broken animations.

Therefore, we should use `InteractionManager` to avoid broken frames.

```tsx
InteractionManager.runAfterInteractions(() => {
	// ...
});
```

#### 5.2. LayoutAnimation

This would run the animation during the next layout

```tsx
const AnotherComponent = () => {
	// ...
	function handleClick() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
		// ...
  }
	// ...
}
```

Make sure the flag has to be set for works on Android.

```tsx
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
```

#### 5.3. Use nativeDriver With the Animated Library

Using `nativeDriver` to send animations over the native bridge before the animation starts on the screen. it reduces workload on `JS thread` and move to `UI thread`.

```tsx
Animated.timing(opacity, {
	toValue: 1,
  duration: 300,
  useNativeDriver: true,
}).start();
```

Other suggest is using [Reanimated 2](https://docs.swmansion.com/react-native-reanimated/). It provides new approach for making new smooth animations and interactions.

#### 6. TextInput

The problem with controlled inputs in React Native is that on slower devices or when a user is typing really fast, rendering may occur while updating the view.

For example,

```tsx
function UncontrolledInputs() {
  const [text, onTextChange] = React.useState('Controlled inputs');
  return (
    <TextInput
      style={styles.input}
      onChangeText={onTextChange}
      defaultValue={text}
    />
  );
}
```

Consider to you [react-hook-form](https://react-hook-form.com/) if the screen has more than 2 TextInput.

#### 7. Redux

### 8. Other configuration

#### 8.1. Using Hermes

Hermes is an open-source JavaScript engine optimized for React Native. Enabling Hermes will result in

- improved start-up time
- decreased memory usage
- smaller app size

##### Android

Edit `android/app/build.gradle` file

```groovy
  project.ext.react = [
      entryFile: "index.js",
-     enableHermes: false  // clean and rebuild if changing
+     enableHermes: true  // clean and rebuild if changing
  ]
```

```java
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
```

Then, clean and build project.

##### iOS

edit `ios/Podfile` file

```swift
use_react_native!(
  :path => config[:reactNativePath],
-  :hermes_enabled => flags[:hermes_enabled],
+  :hermes_enabled => true
)
```

Then install Hermes pods with 

```sh
$ cd ios && pod install
```

#### 8.2. Enable the RAM Format

On **iOS**, edit `../node_modules/react-native/scripts/react-native-xcode.sh`

```sh
export BUNDLE_COMMAND="ram-bundle" // add this
export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh
```

On **Android**

edit `android/app/build.gradle`

```groovy
project.ext.react = [
  bundleCommand: "ram-bundle",
]
```

**Note**: If you are using the Hermes JS Engine, you do not need RAM bundles

#### 8.3. Reduce Android App Size

Enabling Proguard to reduce the size of the APK

```groovy
// android/app/build.gradle
/**
* Run Proguard to shrink the Java bytecode in release builds.
*/
def enableProguardInReleaseBuilds = true
```

Set `enableSeparateBuildPerCPUArchitecture = true` . Android devices support two major device artitectures armebi and x86. By default RN builds the native librariers for both these artitectures into the same apk.



