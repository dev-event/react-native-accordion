import React, {
  useCallback,
  forwardRef,
  useMemo,
  useEffect,
  useState,
  useImperativeHandle,
  Ref,
} from 'react';
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
  runOnJS,
} from 'react-native-reanimated';
import Chevron from '../chevron';
import type { IAccordionProps } from './types';
import { styles } from './styles';
import { useLayout } from '../hooks';

export default forwardRef((props: IAccordionProps, ref: Ref<any>) => {
  //props configuration
  const {
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
    isUnmountedContent = false,
    activeBackgroundIcon = '#e5f6ff',
    handleCustomTouchable,
    onAnimatedEndExpanded,
    onAnimatedEndCollapsed,
    handleContentTouchable,
    inactiveBackgroundIcon = '#fff0e4',
    handleIndicatorFetching,
  } = props;

  const [layout, onLayout] = useLayout(0);
  const open = useSharedValue(initExpand);
  const size = useSharedValue(contentHeight);
  const [isUnmounted, setUnmountedContent] =
    useState<boolean>(isUnmountedContent);

  useImperativeHandle(ref, () => ({
    openAccordion
  }));

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
    open.value
      ? withTiming(1, configExpanded, () => {
          onAnimatedEndExpanded && runOnJS(onAnimatedEndExpanded)();
        })
      : withTiming(0, configCollapsed, () => {
          onAnimatedEndCollapsed && runOnJS(onAnimatedEndCollapsed)();
          if (isUnmountedContent) runOnJS(setUnmountedContent)(true);
        })
  );

  const style = useAnimatedStyle(() => ({
    height: size.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1,
  }));

  const openAccordion = useCallback(() => {
    if (size.value === 0) {
      runOnUI(setUnmountedContent)(false);
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

  const content = useCallback(() => {
    if (isUnmounted && !open.value) {
      return null;
    }

    return renderContent ? renderContent() : null;
  }, [isUnmounted, open.value, renderContent]);

  return (
    <>
      <TouchableWithoutFeedback
        onPress={openAccordion}
        disabled={disabled || isStatusFetching}
        {...otherProperty}
      >
        {renderHeader()}
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.content, style]}>
        <View onLayout={onLayout} style={[styles.container, styleContainer]}>
          {content()}
        </View>
      </Animated.View>
    </>
  );
});
