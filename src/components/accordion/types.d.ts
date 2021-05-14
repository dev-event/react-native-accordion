import React, { FC } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import type Animated from 'react-native-reanimated';

export interface AccordionProps {
  /**
   * Initial snap index
   * @type boolean
   * @default false
   */
  initExpand?: boolean;
  /**
   * Handle height helps to calculate the internal container and sheet layouts,
   * if `handleHeader` is provided, the library internally will calculate its layout,
   * unless `handleHeight` is provided.
   * @type number
   */
  handleCustomTouchableHeight?: number;

  styleTouchable?: Animated.AnimateStyle<ViewStyle>;
  styleContainer?: ViewStyle<ViewStyle>;
  // components
  /**
   * Component header.
   */
  handleCustomTouchable?: () => FC | null;

  renderContent?: () => FC | null;

  /**
   * function
   * callback state hide/show content
   */
  onChangeState: (value: boolean) => void;

  /**
   * A scrollable node or normal view.
   * @type ReactNode[] | ReactNode
   */
  children: (() => React.ReactNode) | React.ReactNode[] | React.ReactNode;

  /**
   * Component icon.
   */
  handleContentTouchable?: () => FC | null;
  /**
   * if accordion hide -> unmounted content
   */
  isUnmountedContent?: boolean;

  /**
   *  background for icon arrow
   */
  isBackgroundChevron?: boolean;

  /**
   * Component icon.
   */
  handleIcon?: () => FC | null;

  /**
   * color active background arrow
   */
  activeBackgroundIcon?: string;
  /**
   * color inactive background arrow
   */
  inactiveBackgroundIcon?: string;

  /**
   * color icon
   */
  colorIcon?: string;
  /**
   * size arrow icon
   */
  sizeIcon?: number;

  styleChevron?: StyleProp<ViewStyle>;
}
