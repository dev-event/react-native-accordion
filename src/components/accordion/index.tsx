import React, { useCallback, FC, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  runOnUI,
} from 'react-native-reanimated';
import { Chevron } from '../chevron';
import type { AnimatedAccordionProps } from '../accordion/types';
import { styles } from '../accordion/styles';
import { useLayout } from '../../hooks';

const AnimatedAccordion: FC<AnimatedAccordionProps> = ({
  isArrow = true,
  sizeIcon = 16,
  disabled = false,
  colorIcon = '#16182b',
  initExpand = false,
  handleIcon,
  styleChevron,
  contentHeight = 0,
  renderContent,
  otherProperty,
  onChangeState,
  styleTouchable,
  configExpanded,
  styleContainer,
  configCollapsed,
  isStatusFetching = false,
  isPointerEvents = false,
  isUnmountOnCollapse = false,
  activeBackgroundIcon = '#e5f6ff',
  onAnimatedEndExpanded,
  handleCustomTouchable,
  handleIndicatorFetching,
  handleContentTouchable,
  onAnimatedEndCollapsed,
  inactiveBackgroundIcon = '#fff0e4',
}) => {
  const [layout, onLayout] = useLayout(0);
  const [isUnmounted, setUnmounted] = useState(false);
  //
  const open = useSharedValue(initExpand);
  /**
   * FIXME add spring
   */
  const progress = useDerivedValue(() =>
    open.value
      ? withTiming(1, configExpanded, onAnimatedEndExpanded)
      : withTiming(0, configCollapsed, handleExpandedCallback)
  );

  const handleExpandedCallback = useCallback(
    (isFinished: boolean) => {
      if (isUnmountOnCollapse && !open.value && isFinished) {
        setUnmounted(true);
      }

      onAnimatedEndCollapsed(isFinished);
    },
    [isUnmountOnCollapse, onAnimatedEndCollapsed, open.value]
  );

  const size = useSharedValue(initExpand ? contentHeight : 0);

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

  const hasLoader = useMemo(
    () =>
      isStatusFetching ? (
        handleIndicatorFetching ? (
          handleIndicatorFetching()
        ) : (
          <ActivityIndicator size="small" color="#AAAAAA" />
        )
      ) : (
        <Chevron
          sizeIcon={sizeIcon}
          progress={progress}
          colorIcon={colorIcon}
          handleIcon={handleIcon}
          styleChevron={styleChevron}
          activeBackgroundIcon={activeBackgroundIcon}
          inactiveBackgroundIcon={inactiveBackgroundIcon}
        />
      ),
    [
      activeBackgroundIcon,
      colorIcon,
      handleIcon,
      handleIndicatorFetching,
      inactiveBackgroundIcon,
      isStatusFetching,
      progress,
      sizeIcon,
      styleChevron,
    ]
  );

  const renderHeader = useCallback(() => {
    return handleCustomTouchable ? (
      handleCustomTouchable()
    ) : (
      <Animated.View style={[styles.header, styleTouchable]}>
        {handleContentTouchable ? handleContentTouchable() : null}
        {isArrow ? hasLoader : null}
      </Animated.View>
    );
  }, [
    handleCustomTouchable,
    styleTouchable,
    handleContentTouchable,
    isArrow,
    hasLoader,
  ]);

  const pointerEvents = !isPointerEvents && open.value ? 'none' : 'auto';
  return (
    <>
      <Pressable
        onPress={handleCollapsed}
        disabled={disabled}
        {...otherProperty}
      >
        {renderHeader()}
      </Pressable>

      <Animated.View
        style={[styles.content, style]}
        // pointerEvents={pointerEvents}
      >
        <View onLayout={onLayout} style={[styles.container, styleContainer]}>
          {isUnmounted ? null : renderContent ? renderContent() : null}
        </View>
      </Animated.View>
    </>
  );
};

export default AnimatedAccordion;
