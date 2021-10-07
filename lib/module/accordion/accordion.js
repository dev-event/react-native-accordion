function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useCallback, forwardRef, useMemo, useEffect, useState, useImperativeHandle } from 'react';
import { ActivityIndicator, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, useDerivedValue, withTiming, runOnUI, runOnJS } from 'react-native-reanimated';
import Chevron from '../chevron';
import { styles } from './styles';
import { useLayout, useValidator } from '../hooks';
import { DEFAULT_INITIAL_MOUNTED_CONTENT_ACCORDION, DEFAULT_UNMOUNTED_CONTENT_ACCORDION, DEFAULT_INACTIVE_BACKGROUND_CHEVRON, DEFAULT_EXPANDED_CONTENT_ACCORDION, DEFAULT_ACTIVE_BACKGROUND_CHEVRON, DEFAULT_DISABLED_HEAD_ACCORDION, DEFAULT_PROGRESS_LOADING_API, DEFAULT_SIZE_TINT_CHEVRON, DEFAULT_VISIBLE_CHEVRON, DEFAULT_HEIGHT_CONTENT, DEFAULT_TINT_CHEVRON, DEFAULT_CONTENT_HEIGHT } from './constant';
export default /*#__PURE__*/forwardRef((props, ref) => {
  useValidator(props); //props configuration

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
    initialMountedContent = DEFAULT_INITIAL_MOUNTED_CONTENT_ACCORDION,
    handleCustomTouchable,
    onAnimatedEndExpanded,
    onAnimatedEndCollapsed,
    handleContentTouchable,
    inactiveBackgroundIcon = DEFAULT_INACTIVE_BACKGROUND_CHEVRON,
    handleIndicatorFetching
  } = props;
  const [layout, onLayout] = useLayout(0);
  const open = useSharedValue(initExpand);
  const [isUnmounted, setUnmountedContent] = useState(isUnmountedContent);
  const [isMounted, setMounted] = useState(initialMountedContent);
  const handleHeightContent = useMemo(() => renderContent === null ? 0 : contentHeight || layout.height || DEFAULT_CONTENT_HEIGHT, [contentHeight, layout.height, renderContent]);
  const size = useSharedValue(handleHeightContent);
  useImperativeHandle(ref, () => ({
    openAccordion
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
  const progress = useDerivedValue(() => open.value ? withTiming(1, configExpanded, created) : withTiming(0, configCollapsed, unmount));
  const style = useAnimatedStyle(() => ({
    height: size.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1
  }));
  const created = useCallback(() => {
    if (onAnimatedEndExpanded !== undefined) {
      runOnJS(onAnimatedEndExpanded)();
    }
  }, [onAnimatedEndExpanded]);
  const unmount = useCallback(() => {
    if (onAnimatedEndCollapsed !== undefined) {
      runOnJS(onAnimatedEndCollapsed)();
    }

    if (isUnmountedContent) {
      runOnJS(setUnmountedContent)(true);
      return;
    }
  }, [isUnmountedContent, onAnimatedEndCollapsed]);
  const openAccordion = useCallback(() => {
    if (size.value === 0) {
      if (!isMounted) setMounted(true);
      runOnUI(setUnmountedContent)(false);
      runOnUI(() => {
        'worklet';

        size.value = handleHeightContent;
      })();
    }

    open.value = !open.value;
    onChangeState && onChangeState(!open.value);
  }, [handleHeightContent, isMounted, onChangeState, open, size]);
  const hasLoader = useMemo(() => isStatusFetching ? handleIndicatorFetching ? handleIndicatorFetching() : /*#__PURE__*/React.createElement(ActivityIndicator, {
    size: "small",
    color: "#AAAAAA",
    style: styles.indicator
  }) : /*#__PURE__*/React.createElement(Chevron, {
    sizeIcon: sizeIcon,
    progress: progress,
    colorIcon: colorIcon,
    handleIcon: handleIcon,
    styleChevron: styleChevron,
    activeBackgroundIcon: activeBackgroundIcon,
    inactiveBackgroundIcon: inactiveBackgroundIcon
  }), [progress, sizeIcon, colorIcon, handleIcon, styleChevron, isStatusFetching, activeBackgroundIcon, inactiveBackgroundIcon, handleIndicatorFetching]);
  const renderHeader = useCallback(() => {
    if (handleCustomTouchable === null) {
      return null;
    }

    return handleCustomTouchable !== undefined ? handleCustomTouchable() : /*#__PURE__*/React.createElement(Animated.View, {
      style: [styles.header, styleTouchable]
    }, handleContentTouchable ? handleContentTouchable() : null, isArrow ? hasLoader : null);
  }, [isArrow, hasLoader, styleTouchable, handleCustomTouchable, handleContentTouchable]);
  const content = useCallback(() => {
    if (isUnmounted && !open.value) {
      return null;
    }

    return isMounted && renderContent ? renderContent() : null;
  }, [isMounted, isUnmounted, open.value, renderContent]);
  const contentStyle = useMemo(() => [styles.container, styleContainer], [styleContainer]);
  const containerAnimatedStyle = useMemo(() => [styles.content, style], [style]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, _extends({
    onPress: openAccordion,
    disabled: disabled || isStatusFetching
  }, otherProperty), renderHeader()), /*#__PURE__*/React.createElement(Animated.View, {
    style: containerAnimatedStyle
  }, /*#__PURE__*/React.createElement(View, {
    onLayout: onLayout,
    style: contentStyle
  }, content())));
});
//# sourceMappingURL=accordion.js.map