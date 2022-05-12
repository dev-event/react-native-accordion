import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix, mixColor } from 'react-native-redash';

const Chevron = _ref => {
  let {
    sizeIcon,
    progress,
    colorIcon,
    handleIcon,
    styleChevron,
    activeBackgroundIcon,
    inactiveBackgroundIcon
  } = _ref;
  const style = useAnimatedStyle(() => ({
    // @ts-ignore
    backgroundColor: mixColor(progress.value, inactiveBackgroundIcon, activeBackgroundIcon),
    transform: [{
      rotateZ: `${mix(progress.value, 0, Math.PI)}rad`
    }]
  }));
  const hasIcon = useMemo(() => /*#__PURE__*/React.createElement(Svg, {
    width: sizeIcon,
    height: sizeIcon,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement(Path, {
    d: "M6 9l6 6 6-6",
    stroke: colorIcon
  })), [colorIcon, sizeIcon]);
  const renderIcon = useCallback(() => {
    if (handleIcon === null) {
      return null;
    }

    return handleIcon !== undefined ? handleIcon(progress) : hasIcon;
  }, [handleIcon, hasIcon, progress]);
  const containerAnimatedStyle = useMemo(() => [styles.container, style, styleChevron], [style, styleChevron]);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: containerAnimatedStyle
  }, renderIcon());
};

export default Chevron;
const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#525251'
  }
});
//# sourceMappingURL=chevron.js.map