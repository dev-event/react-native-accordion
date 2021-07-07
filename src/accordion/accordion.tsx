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
import {
  DEFAULT_UNMOUNTED_CONTENT_ACCORDION,
  DEFAULT_INACTIVE_BACKGROUND_CHEVRON,
  DEFAULT_EXPANDED_CONTENT_ACCORDION,
  DEFAULT_ACTIVE_BACKGROUND_CHEVRON,
  DEFAULT_DISABLED_HEAD_ACCORDION,
  DEFAULT_PROGRESS_LOADING_API,
  DEFAULT_SIZE_TINT_CHEVRON,
  DEFAULT_VISIBLE_CHEVRON,
  DEFAULT_HEIGHT_CONTENT,
  DEFAULT_TINT_CHEVRON,
} from './constant';

export default forwardRef((props: IAccordionProps, ref: Ref<any>) => {
  //props configuration
  const {
    isArrow = DEFAULT_VISIBLE_CHEVRON,
    sizeIcon = DEFAULT_SIZE_TINT_CHEVRON,
    disabled = DEFAULT_DISABLED_HEAD_ACCORDION,
    colorIcon = DEFAULT_TINT_CHEVRON,
    initExpand = DEFAULT_EXPANDED_CONTENT_ACCORDION,
    handleIcon,
    styleChevron,
    contentHeight = DEFAULT_HEIGHT_CONTENT,
    renderContent,
    otherProperty,
    onChangeState,
    styleTouchable,
    configExpanded,
    styleContainer,
    configCollapsed,
    isStatusFetching = DEFAULT_PROGRESS_LOADING_API,
    isUnmountedContent = DEFAULT_UNMOUNTED_CONTENT_ACCORDION,
    activeBackgroundIcon = DEFAULT_ACTIVE_BACKGROUND_CHEVRON,
    handleCustomTouchable,
    onAnimatedEndExpanded,
    onAnimatedEndCollapsed,
    handleContentTouchable,
    inactiveBackgroundIcon = DEFAULT_INACTIVE_BACKGROUND_CHEVRON,
    handleIndicatorFetching,
  } = props;

  const [layout, onLayout] = useLayout(0);
  const open = useSharedValue(initExpand);
  const size = useSharedValue(contentHeight);
  const [isUnmounted, setUnmountedContent] =
    useState<boolean>(isUnmountedContent);

  useImperativeHandle(ref, () => ({
    openAccordion,
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
