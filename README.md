<div align="center">
  <img src="./gif/giphy.gif" height="400" title="Accordion Animated"   alt="Accordion Animated" style="box-shadow: 0 20px 30px 3px rgba(9, 9, 16, 0.2);">
</div>

<br>

<h1 align="center">React Native Accordion (Reanimated 2)</h1>
<p align="center">Performance oriented React Native Accordion.  A simple component of a common use case of collapsible - a visible title with a collapsible view beneath it.</p>
<h6 align="center">Made with ❤️ by developer for developers</h6>

<br>
<p align="center">
<img src="http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square" alt="build"/>
<img src="https://img.shields.io/github/issues/dev-event/react-native-accordion" alt="build"/>
<img src="https://img.shields.io/bitbucket/pr-raw/dev-event/react-native-accordion" alt="build"/>
<img src="http://img.shields.io/:license-mit-blue.svg?style=flat-square" alt="build"/>
</p>



## Thanks
<p>Please, click on ⭐ button.</p>


## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Props](#props)
- [Methods](#methods)
- [Example](#example)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)


## Installation

<p>Expo:</p>



```bash
$ expo install react-native-reanimated
```


<p>React Native (0.60+):</p>


```bash
$ yarn add react-native-reanimated@2
```
and package:

```bash
$ yarn add react-native-accordion
```

- [expo](https://www.npmjs.com/package/react-native)
- [react-native](https://www.npmjs.com/package/react-native)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)



## Features

- Supported Reanimated 2;
- Fully supported on React Native and Expo;
- Simple API but fully customizable;
- Arrow animation indicating whether the collapsible is expanded or not;
- Property which unmount the collapsible when it is not expanded(very useful for performance! use wisely(Beta);

## Usage

For more complete example open [App.tsx](https://github.com/dev-event/react-native-accordion/master/example/App.tsx)

```tsx
import React, { useState, useCallback } from "react";
import { AnimatedAccordion } from 'react-native-accordion';


const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleContentTouchable = useCallback(() => {
    return <Text>Sample header</Text>
  }, [])

  const handleContent = useCallback(() => {
    return <Text>Sample content</Text>
  }, [])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <SafeAreaView style={styles.body}>
          <AnimatedAccordion
            onChangeState={value => setShow(value)}
            renderContent={handleContent}
            styleContainer={styles.content}
            styleTouchable={styles.button}
            handleContentTouchable={handleContentTouchable}
          />
        </SafeAreaView>
      </View>
    </>
  );
};



```



## Props

- `isArrow?`: boolean
- `initExpand?`: boolean
- `isPointerEvents?`: boolean;
- `isUnmountOnCollapse?`: boolean;
- `colorIcon?`: string
- `sizeIcon?`: number
- `activeBackgroundIcon?`: string;
- `inactiveBackgroundIcon?`: string;
- `contentHeight?`:  number
- `handleIcon?`:  () => void
- `handleCustomTouchable?`:  () => void
- `handleContentTouchable?`:  () => void
- `renderContent?`:  () => void;
- `configExpanded?`: object;
- `configCollapsed?`: object;
- `styleChevron?`: `StyleProp<ViewStyle>`;
- `styleTouchable?`: `StyleProp<ViewStyle>`;
- `styleContainer?`: `StyleProp<ViewStyle>`;

## Methods

- `onChangeState`: (value: boolean) => boolean


## 🎉 Example

Checkout the example [here](https://github.com/dev-event/react-native-accordion/example/src/screens/home).

## ✌️ Contributing

Pull requests are always welcome! Feel free to open a new GitHub issue for any changes that can be made.

## Support

Reach out to me at one of the following places!

- E-mail <a href="#" target="_blank">effectwaater@gmail.com</a>


## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**

[react-native-country-picker-modal]: https://github.com/xcarpentier/react-native-country-picker-modal
