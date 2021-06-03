import { FC } from 'react';
import { ViewStyle, ViewProps } from 'react-native';
import type Animated from 'react-native-reanimated';

export interface AnimatedAccordionProps {
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
  renderContent?: () => FC | null;

  /**
   * callback change state hide/show content
   */
  onChangeState: (value: boolean) => void;

  /**
   *
   */
  handleContentTouchable?: () => FC | null;
  /**
   *
   */
  isUnmountOnCollapse?: boolean;

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

  isPointerEvents?: boolean;

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
