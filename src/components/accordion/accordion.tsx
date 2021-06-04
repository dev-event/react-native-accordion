import React, { useCallback, FC, useMemo, useEffect } from 'react';
import {
  ActivityIndicator,
  TouchableWithoutFeedback,
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
  activeBackgroundIcon = '#e5f6ff',
  handleCustomTouchable,
  handleIndicatorFetching,
  handleContentTouchable,
  inactiveBackgroundIcon = '#fff0e4',
}) => {
  const [layout, onLayout] = useLayout(0);

  const open = useSharedValue(initExpand);
  const size = useSharedValue(contentHeight);

  useEffect(() => {
    runOnUI(() => {
      'worklet';
      if (initExpand && layout) {
        size.value = layout.height;
      }
    })();
  }, [initExpand, layout, layout.height, size]);

  useEffect(() => {
    runOnUI(() => {
      'worklet';
      if (!isStatusFetching && layout) {
        size.value = layout.height;
      }
    })();
  }, [isStatusFetching, layout, size]);

  const progress = useDerivedValue(() =>
    open.value ? withTiming(1, configExpanded) : withTiming(0, configCollapsed)
  );

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
          <ActivityIndicator
            size="small"
            color="#AAAAAA"
            style={styles.indicator}
          />
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

  return (
    <>
      <TouchableWithoutFeedback
        onPress={handleCollapsed}
        disabled={disabled || isStatusFetching}
        {...otherProperty}
      >
        {renderHeader()}
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.content, style]}>
        <View onLayout={onLayout} style={[styles.container, styleContainer]}>
          {renderContent ? renderContent() : null}
        </View>
      </Animated.View>
    </>
  );
};

export { AnimatedAccordion };
