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
  ViewStyle,
  useWindowDimensions,
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
import { useValidator } from '../hooks';
import {
  DEFAULT_INITIAL_MOUNTED_CONTENT_ACCORDION,
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
  DEFAULT_CONTENT_HEIGHT,
} from './constant';

const DefaultLoading = () => {
  return (
    <View style={{ padding: 20 }}>
      <ActivityIndicator
        size="large"
        color="#AAAAAA"
        style={styles.indicator}
      />
    </View>
  );
};

export default forwardRef((props: IAccordionProps, ref: Ref<any>) => {
  useValidator(props);
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
    onPressSideEffect = () => {},
    TouchableComponent = TouchableWithoutFeedback,
    isUnmountedContent = DEFAULT_UNMOUNTED_CONTENT_ACCORDION,
    activeBackgroundIcon = DEFAULT_ACTIVE_BACKGROUND_CHEVRON,
    initialMountedContent = DEFAULT_INITIAL_MOUNTED_CONTENT_ACCORDION,
    handleCustomTouchable,
    onAnimatedEndExpanded,
    onAnimatedEndCollapsed,
    handleContentTouchable,
    inactiveBackgroundIcon = DEFAULT_INACTIVE_BACKGROUND_CHEVRON,
    handleIndicatorFetching,
    needsMoreSpaceForScroll,
  } = props;
  const { height } = useWindowDimensions();
  const open = useSharedValue(initExpand);
  const [isUnmounted, setUnmountedContent] =
    useState<boolean>(isUnmountedContent);
  const [isMounted, setMounted] = useState<boolean>(initialMountedContent);
  const [addExtraSpace, setAddExtraSpace] = useState<boolean>(false);
  const handleHeightContent = useMemo(
    () =>
      renderContent === null ? 0 : contentHeight || DEFAULT_CONTENT_HEIGHT,
    [contentHeight, renderContent]
  );

  const size = useSharedValue(handleHeightContent);

  useImperativeHandle(ref, () => ({
    openAccordion,
  }));

  useEffect(() => {
    runOnUI(() => {
      'worklet';
      if (initExpand && isMounted && handleHeightContent) {
        size.value = handleHeightContent;
      }
    })();
  }, [handleHeightContent, initExpand, isMounted, size]);

  useEffect(() => {
    runOnUI(() => {
      'worklet';
      if (!isStatusFetching && handleHeightContent) {
        size.value = handleHeightContent;
      }
    })();
  }, [handleHeightContent, isStatusFetching, size]);

  const created = useCallback(() => {
    if (onAnimatedEndExpanded !== undefined) {
      runOnJS(onAnimatedEndExpanded)();
    }
    runOnUI(setMounted)(true);
    runOnJS(setAddExtraSpace)(false);
  }, [onAnimatedEndExpanded]);

  const unmount = useCallback(() => {
    if (onAnimatedEndCollapsed !== undefined) {
      runOnJS(onAnimatedEndCollapsed)();
    }

    if (isUnmountedContent) {
      runOnJS(setUnmountedContent)(true);
      setMounted(false);
      return;
    }
  }, [isUnmountedContent, onAnimatedEndCollapsed]);

  const progress = useDerivedValue(() =>
    open.value
      ? withTiming(1, configExpanded, runOnJS(created))
      : withTiming(0, configCollapsed, runOnJS(unmount))
  );

  const style = useAnimatedStyle(() => ({
    height: size.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1,
  }));

  const openAccordion = useCallback(() => {
    runOnUI(setUnmountedContent)(false);
    runOnUI(() => {
      'worklet';
      size.value = handleHeightContent;
    })();
    open.value = !open.value;
    onChangeState && onChangeState(!open.value);
  }, [handleHeightContent, isMounted, onChangeState, open, size]);

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
      progress,
      sizeIcon,
      colorIcon,
      handleIcon,
      styleChevron,
      isStatusFetching,
      activeBackgroundIcon,
      inactiveBackgroundIcon,
      handleIndicatorFetching,
    ]
  );

  const renderHeader = useCallback(() => {
    if (handleCustomTouchable === null) {
      return null;
    }

    return handleCustomTouchable !== undefined ? (
      handleCustomTouchable(progress)
    ) : (
      <Animated.View style={[styles.header, styleTouchable]}>
        {handleContentTouchable ? handleContentTouchable(progress) : null}
        {isArrow ? hasLoader : null}
      </Animated.View>
    );
  }, [
    isArrow,
    hasLoader,
    open.value,
    styleTouchable,
    handleCustomTouchable,
    handleContentTouchable,
  ]);

  const content = useCallback(() => {
    if (isUnmounted && !open.value) {
      return null;
    }

    if (!isMounted && !isUnmounted) {
      return <DefaultLoading />
    }

    return isMounted && renderContent ? renderContent(progress) : null;
  }, [isMounted, isUnmounted, open.value, renderContent]);

  const contentStyle = useMemo<ViewStyle[]>(
    () => [styles.container, styleContainer],
    [styleContainer]
  );
  const containerAnimatedStyle = useMemo(
    () => [styles.content, style],
    [style]
  );

  const touchableOnPress = React.useCallback(() => {
    openAccordion();
    if (!open.value && !needsMoreSpaceForScroll) {
      onPressSideEffect();
    } else if (!open.value && needsMoreSpaceForScroll) {
      setAddExtraSpace(true);
    };
  }, [openAccordion, onPressSideEffect, open.value]);

  React.useEffect(() => {
    if (needsMoreSpaceForScroll && addExtraSpace) {
      onPressSideEffect()
    }
  }, [addExtraSpace])

  return (
    <>
      <TouchableComponent
        onPress={touchableOnPress}
        disabled={disabled || isStatusFetching}
        {...otherProperty}
      >
        {renderHeader()}
      </TouchableComponent>

      <Animated.View style={containerAnimatedStyle}>
        <View style={contentStyle}>{content()}</View>
      </Animated.View>
      {addExtraSpace ? (
        <View style={{ height }} />
      ) : null}
    </>
  );
});
