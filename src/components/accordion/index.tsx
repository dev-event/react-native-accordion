import React, { useCallback, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  runOnUI,
} from 'react-native-reanimated';
import { Chevron } from '../chevron';
import type { AccordionProps } from './types';
import { styles } from './styles';
import { useLayout } from '../../hooks';

const AnimatedAccordion = ({
  isArrow = true,
  sizeIcon = 16,
  disabled = false,
  colorIcon = '#16182b',
  initExpand = false,
  handleIcon,
  styleChevron,
  contentHeight,
  renderContent,
  otherProperty,
  onChangeState,
  styleTouchable,
  configExpanded,
  styleContainer,
  configCollapsed,
  isPointerEvents = false,
  isBackgroundChevron = true,
  isUnmountOnCollapse = false,
  activeBackgroundIcon = '#e5f6ff',
  onAnimatedEndExpanded,
  handleCustomTouchable,
  handleContentTouchable,
  onAnimatedEndCollapsed,
  inactiveBackgroundIcon = '#fff0e4',
}: AccordionProps) => {
  const [layout, onLayout] = useLayout(contentHeight);
  const [isUnmounted, setUnmounted] = useState(initExpand);

  const open = useSharedValue(false);
  /**
   * FIXME add spring
   */
  const progress = useDerivedValue(() =>
    open.value
      ? withTiming(1, configExpanded, onAnimatedEndExpanded)
      : withTiming(0, configCollapsed, handleExpandedCallback)
  );

  const handleExpandedCallback = useCallback(
    (isFinished) => {
      if (isUnmountOnCollapse && !open.value && isFinished) setUnmounted(true);

      onAnimatedEndCollapsed(isFinished);
    },
    [isUnmountOnCollapse, onAnimatedEndCollapsed, open.value]
  );

  const size = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    height: size.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1,
  }));

  const handleCollapsed = useCallback(() => {
    if (size.value === 0) {
      runOnUI(() => {
        'worklet';
        size.value = layout?.height;
      })();
    }
    open.value = !open.value;
    onChangeState && onChangeState(!open.value);
  }, [layout?.height, onChangeState, open, size]);

  const renderHeader = useCallback(() => {
    return handleCustomTouchable ? (
      handleCustomTouchable()
    ) : (
      <Animated.View style={[styles.header, styleTouchable]}>
        {handleContentTouchable ? handleContentTouchable() : null}
        {isArrow ? (
          <Chevron
            sizeIcon={sizeIcon}
            progress={progress}
            colorIcon={colorIcon}
            handleIcon={handleIcon}
            styleChevron={styleChevron}
            isBackgroundChevron={isBackgroundChevron}
            activeBackgroundIcon={activeBackgroundIcon}
            inactiveBackgroundIcon={inactiveBackgroundIcon}
          />
        ) : null}
      </Animated.View>
    );
  }, [
    isArrow,
    progress,
    sizeIcon,
    colorIcon,
    handleIcon,
    styleChevron,
    styleTouchable,
    isBackgroundChevron,
    activeBackgroundIcon,
    handleCustomTouchable,
    handleContentTouchable,
    inactiveBackgroundIcon,
  ]);

  const pointerEvents = !isPointerEvents && open.value ? 'none' : 'auto';
  return (
    <>
      <TouchableWithoutFeedback
        onPress={handleCollapsed}
        disabled={disabled}
        {...otherProperty}
      >
        {renderHeader()}
      </TouchableWithoutFeedback>

      <Animated.View
        style={[styles.content, style]}
        pointerEvents={pointerEvents}
      >
        <View onLayout={onLayout} style={[styles.container, styleContainer]}>
          {isUnmounted ? null : renderContent ? renderContent() : null}
        </View>
      </Animated.View>
    </>
  );
};

export { AnimatedAccordion };
