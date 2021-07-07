import Animated from 'react-native-reanimated';
import { FC } from 'react';
import { ViewStyle } from 'react-native';
export interface IChevronProps {
  progress: Animated.SharedValue<number>;
  sizeIcon?: number;
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

  styleChevron?: Animated.AnimateStyle<ViewStyle>;
  colorIcon?: string;
}
