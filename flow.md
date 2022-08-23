Optimize your React Native app performance


1. remove all `console` statements
 - `babel-plugin-transform-remove-console`

```js
  env: {
    production: {
      plugins: ['transform-remove-console']
    },
  }
```



2. Memoize expensive computations with React Hooks
  - `memo`, `useMemo`, `useCallback`
2.1. useMemo
```tsx
  const streetTypes = useMemo(() => {
    let topStreetTypes = dataJson.topStreetTypes.map(value => ({ display: value, value }));
    let streetType = dataJson.streetTypes.map(value => ({ display: value, value }));
    let separator = { display: '--------------', value: '', disable: true };
    return [...topStreetTypes, separator, ...streetType];
  }, []);
```

2.2. useCallback

```tsx
  const launchSelectImagesPicker = useCallback(async ({ multiple, option, onConfirm }) => {
    const grant = await PermissionLib.requestStoragePermission(true);
    if (!grant) {
      return [];
    }
    const configs = multiple ? DEFAULT_OPTIONS.multiple : merge(option, DEFAULT_OPTIONS.image);
    openPicker(configs)
      .then(images => {
        const result = multiple ? images : [images];
        isFunction(onConfirm) && onConfirm(transformImages(result));
      })
      .catch(error => {
        if (error.message) {
          GlobalLib.Toast.get().toastWarning(error.message);
        }
      });
  }, []);
```

2.3. memo

```tsx
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual);
```


3. Use `FlatList` or `SectionList` to render large lists instead of `ScrollView`

4. Resize image and cache locally 
  resize
     - using PNG format
     - using smaller-resolution images
  cache
    - use `react-native-fast-image`
  prefetch/preload image => 

1. Animations: 
5.1. `InteractionManager`


```tsx
InteractionManager.runAfterInteractions(() => {
   ...
});
```
5.2. `LayoutAnimation`

```tsx
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

```

5.3. Use native driver
```tsx
  Animated.timing(opacity, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();
```

5.4 Try to use [reanimated 2](https://github.com/software-mansion/react-native-reanimated)


6. Use Hermes
 - Reducing memory usage
 - Decreasing app size
 - Improving the app start-up time

7. Avoid Arrow Functions

```tsx
function TodoComponent () {
  ...
  function addTodo() {
    ...
  }
  return (
    <Pressable onPress={() => addTodo()} />
  );
}
```

```tsx
function TodoComponent () {
  ...
  const addTodo = useCallback((data) => {
    ...
  },[]);
  return (
    <Pressable onPress={addTodo} />
  );
}
```

8. TextInput
  - [The ultimate guide to React native optimization](https://www.callstack.com/blog/the-ultimate-guide-to-react-native-optimization) from Callback 
8.1. Uncontrolled Inputs
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

const styles = StyleSheet.create({
  input : {  borderWidth: 1, height: 100, borderColor: 'blue' }
})
```

9. [Large List](https://reactnative.dev/docs/0.64/optimizing-flatlist-configuration)
  Flatlist Props:
   - `removeClippedSubviews`
   - `maxToRenderPerBatch`
   - `updateCellsBatchingPeriod`
   - `initialNumToRender`
   - `windowSize`
   - `keyExtractor`
  List items
   - use basic component,  `shouldComponentUpdate` or `memo`
   - cached optimized images: `react-native-fast-image`
   - `getItemLayout`
   - Avoid anonymous function on renderItem



10. Use Performance Monitoring
  - Firebase, Sentry

Android: 
1. ProGuard
https://viblo.asia/p/tim-hieu-ve-proguard-trong-android-924lJ30N5PM#_5-only-obfuscate-your-project-7
2. Enable the RAM Format
  ```gradle
  project.ext.react = [
    bundleCommand: "ram-bundle",
  ]
  ...
  project.ext.react = [
    bundleCommand: "ram-bundle",
    extraPackagerArgs: ["--indexed-ram-bundle"]
  ]
  ```

3. Reduce app size: [Link](https://developer.android.com/guide/app-bundle) 
  - `enableProguardInReleaseBuilds = true`
  - `enableSeparateBuildPerCPUArchitecture = true`



1. Why do we need optimize react native app?
  Need: 
   - make sure 60 FPS and native look and feel to your apps.
   - Deliver smooth UI performance by default
  Structure RN framework: only run one thread.
2. 
