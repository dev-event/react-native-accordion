import React, { useCallback, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  runOnUI,
} from 'react-native-reanimated';
import type { LayoutChangeEvent } from 'react-native';
import { Chevron } from '../chevron';
import type { AccordionProps } from './types';
import { styles } from './styles';
import { useLayout } from '../../hooks';

const CollapsedView = ({
  // configOpened,
  // configClosed,
  isArrow = true,
  sizeIcon = 16,
  colorIcon = '#16182b',
  initExpand = false,
  handleIcon,
  styleChevron,
  renderContent,
  onChangeState,
  styleTouchable,
  styleContainer,
  // isUnmountOnCollapse = false,
  isBackgroundChevron = true,
  activeBackgroundIcon = '#e5f6ff',
  inactiveBackgroundIcon = '#fff0e4',
  isPointerEvents = false,
  handleCustomTouchable,
  handleContentTouchable,
}: // handleCustomTouchableHeight,
AccordionProps) => {
  const [layout, onLayout] = useLayout();
  const [isUnmounted, setUnmounted] = useState(initExpand);

  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0)
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

  // Callback
  // const handleUnmounted = () => {
  //   if (isUnmountOnCollapse && !open.value) setUnmounted(false);
  // };

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
      <TouchableWithoutFeedback onPress={handleCollapsed}>
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

export { CollapsedView };
