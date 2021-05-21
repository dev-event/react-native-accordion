import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix, mixColor } from 'react-native-redash';
import type { AccordionIconProps } from './types';

const Chevron = ({
  sizeIcon,
  progress,
  colorIcon,
  handleIcon,
  styleChevron,
  activeBackgroundIcon,
  inactiveBackgroundIcon,
}: AccordionIconProps) => {
  const style = useAnimatedStyle(() => ({
    // @ts-ignore
    backgroundColor: mixColor(
      progress.value,
      inactiveBackgroundIcon,
      activeBackgroundIcon
    ),
    transform: [{ rotateZ: `${mix(progress.value, 0, Math.PI)}rad` }],
  }));

  const hasIcon = useMemo(
    () => (
      <Svg
        width={sizeIcon}
        height={sizeIcon}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M6 9l6 6 6-6" stroke={colorIcon} />
      </Svg>
    ),
    [colorIcon, sizeIcon]
  );
  const renderIcon = useCallback(() => {
    if (handleIcon === null) {
      return null;
    }

    return handleIcon === undefined ? hasIcon : handleIcon(progress);
  }, [handleIcon, hasIcon, progress]);

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        styleChevron,
      ]}
    >
      {renderIcon()}
    </Animated.View>
  );
};

export { Chevron };

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#525251',
  },
});
