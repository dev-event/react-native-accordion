import React, { useCallback, useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { useAnimatedStyle, AnimatedStyleProp} from 'react-native-reanimated';
import { mix, mixColor } from 'react-native-redash';
import type { IChevronProps } from './types';

const Chevron = ({
  sizeIcon,
  progress,
  colorIcon,
  handleIcon,
  styleChevron,
  activeBackgroundIcon,
  inactiveBackgroundIcon,
}: IChevronProps) => {
  const style = useAnimatedStyle<AnimatedStyleProp<ViewStyle>>(() => ({
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

    return handleIcon !== undefined ? handleIcon(progress) : hasIcon;
  }, [handleIcon, hasIcon, progress]);

  const containerAnimatedStyle = useMemo<
    Animated.AnimatedStyleProp<ViewStyle>[]
  >(() => [styles.container, style, styleChevron], [style, styleChevron]);

  return (
    <Animated.View style={containerAnimatedStyle}>{renderIcon()}</Animated.View>
  );
};

export default Chevron;

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
