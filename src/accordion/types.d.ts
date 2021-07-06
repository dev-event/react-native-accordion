import { FC } from 'react';
import { ViewStyle, ViewProps } from 'react-native';
import type Animated from 'react-native-reanimated';

export interface IAccordionProps {
  /**
   *  active/inactive TouchableWithoutFeedback
   */
  otherProperty?: ViewProps;

  /**
   *  active/inactive TouchableWithoutFeedback
   */
  disabled?: boolean;

  /**
   *  if active then the collapsible will be expanded on mounting.:
   */
  initExpand?: boolean;

  /**
   * Handle height helps to calculate the internal container and sheet layouts,
   * if `renderContent` is provided, the library internally will calculate its layout,
   * unless `contentHeight` is provided.
   */
  contentHeight: number;

  /**
   *  unmounted content
   */
  isUnmountedContent?: boolean;

  /**
   *  unmounted content
   */
  delayUnmounted?: number;

  /**
   *
   */
  isStatusFetching: boolean;

  /**
   *
   */
  handleCustomTouchable?: () => FC | null;

  /**
   *
   */
  handleIndicatorFetching?: () => FC | null;

  /**
   *
   */
  renderContent?: () => JSX.Element | null;

  /**
   * callback change state hide/show content
   */
  onChangeState: (value: boolean) => void;

  /**
   *
   */
  onAnimatedEndExpanded?: () => void;

  /**
   *
   */
  onAnimatedEndCollapsed?: () => void;

  /**
   *
   */
  handleContentTouchable?: () => JSX.Element | null;
  /**
   * component icon.
   */
  handleIcon?: () => FC | null;

  /**
   * active background arrow
   */

  activeBackgroundIcon?: string;

  /**
   * inactive background arrow
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

  isArrow?: boolean;

  /**
   *
   */
  styleChevron?: ViewStyle;

  /**
   *
   */
  styleTouchable?: Animated.AnimateStyle<ViewStyle>;

  /**
   *
   */
  styleContainer?: ViewStyle;
  /**
   *
   */

  configExpanded?: Animated.WithTimingConfig;

  /**
   *
   */
  configCollapsed?: Animated.WithTimingConfig;
}
