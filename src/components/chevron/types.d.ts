import Animated from 'react-native-reanimated';
import React from 'react';
export interface chevron {}

export interface AccordionIconProps {
  progress: Animated.SharedValue<number>;
  handleIcon: React.FC<chevron> | null | undefined;
  handleHead?: React.FC<chevron> | null;
  isBackgroundChevron: boolean;
  inactiveBackgroundIcon: string;
  activeBackgroundIcon: string;
  styleChevron: any;
}
