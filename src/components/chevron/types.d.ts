import Animated from 'react-native-reanimated';
import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface AccordionIconProps {
  progress: Animated.SharedValue<number>;
  sizeIcon?: number;

  /**
   *  background for icon arrow
   */
  isBackgroundChevron: boolean;

  /**
   * Component icon.
   */
  handleIcon?: (progress: Animated.SharedValue<number>) => FC | null;

  /**
   * color active background arrow
   */
  activeBackgroundIcon: string;
  /**
   * color inactive background arrow
   */
  inactiveBackgroundIcon: string;

  styleChevron?: StyleProp<ViewStyle>;
  colorIcon?: string;
}
