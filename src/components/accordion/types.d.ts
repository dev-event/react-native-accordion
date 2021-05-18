import { FC } from 'react';
import { ViewStyle, ViewProps, StyleProp } from 'react-native';
import type Animated from 'react-native-reanimated';

export interface AccordionProps {
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
  contentHeight?: number;

  /**
   *
   */
  handleCustomTouchable?: () => FC | null;

  /**
   *
   */
  renderContent?: () => FC | null;
  /**
   * callback
   */
  onAnimatedEndExpanded: (isFinished) => void;
  /**
   * callback
   */
  onAnimatedEndCollapsed: (isFinished) => void;

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
   *  background icon arrow
   */
  isBackgroundChevron?: boolean;

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

  isPointerEvents?: false;

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
  styleChevron?: StyleProp<ViewStyle>;

  /**
   *
   */
  styleTouchable?: Animated.AnimateStyle<ViewStyle>;

  /**
   *
   */
  styleContainer?: ViewStyle<ViewStyle>;
  /**
   *
   */

  configExpanded?: Animated.WithTimingConfig;

  /**
   *
   */
  configCollapsed?: Animated.WithTimingConfig;
}
