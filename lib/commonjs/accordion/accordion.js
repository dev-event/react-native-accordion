"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _chevron = _interopRequireDefault(require("../chevron"));

var _styles = require("./styles");

var _hooks = require("../hooks");

var _constant = require("./constant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const DefaultLoading = () => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
    size: "large",
    color: "#AAAAAA",
    style: _styles.styles.indicator
  }));
};

var _default = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  (0, _hooks.useValidator)(props); //props configuration

  const {
    isArrow = _constant.DEFAULT_VISIBLE_CHEVRON,
    sizeIcon = _constant.DEFAULT_SIZE_TINT_CHEVRON,
    disabled = _constant.DEFAULT_DISABLED_HEAD_ACCORDION,
    colorIcon = _constant.DEFAULT_TINT_CHEVRON,
    initExpand = _constant.DEFAULT_EXPANDED_CONTENT_ACCORDION,
    handleIcon,
    styleChevron,
    contentHeight = _constant.DEFAULT_HEIGHT_CONTENT,
    renderContent,
    otherProperty,
    onChangeState,
    styleTouchable,
    configExpanded,
    styleContainer,
    configCollapsed,
    isStatusFetching = _constant.DEFAULT_PROGRESS_LOADING_API,
    onPressSideEffect = () => {},
    TouchableComponent = _reactNative.TouchableWithoutFeedback,
    isUnmountedContent = _constant.DEFAULT_UNMOUNTED_CONTENT_ACCORDION,
    activeBackgroundIcon = _constant.DEFAULT_ACTIVE_BACKGROUND_CHEVRON,
    initialMountedContent = _constant.DEFAULT_INITIAL_MOUNTED_CONTENT_ACCORDION,
    handleCustomTouchable,
    onAnimatedEndExpanded,
    onAnimatedEndCollapsed,
    handleContentTouchable,
    inactiveBackgroundIcon = _constant.DEFAULT_INACTIVE_BACKGROUND_CHEVRON,
    handleIndicatorFetching,
    needsMoreSpaceForScroll
  } = props;
  const {
    height
  } = (0, _reactNative.useWindowDimensions)();
  const open = (0, _reactNativeReanimated.useSharedValue)(initExpand);
  const [isUnmounted, setUnmountedContent] = (0, _react.useState)(isUnmountedContent);
  const [isMounted, setMounted] = (0, _react.useState)(initialMountedContent);
  const [addExtraSpace, setAddExtraSpace] = (0, _react.useState)(false);
  const handleHeightContent = (0, _react.useMemo)(() => renderContent === null ? 0 : contentHeight || _constant.DEFAULT_CONTENT_HEIGHT, [contentHeight, renderContent]);
  const size = (0, _reactNativeReanimated.useSharedValue)(handleHeightContent);
  (0, _react.useImperativeHandle)(ref, () => ({
    openAccordion
  }));
  (0, _react.useEffect)(() => {
    (0, _reactNativeReanimated.runOnUI)(() => {
      'worklet';

      if (initExpand && isMounted && handleHeightContent) {
        size.value = handleHeightContent;
      }
    })();
  }, [handleHeightContent, initExpand, isMounted, size]);
  (0, _react.useEffect)(() => {
    (0, _reactNativeReanimated.runOnUI)(() => {
      'worklet';

      if (!isStatusFetching && handleHeightContent) {
        size.value = handleHeightContent;
      }
    })();
  }, [handleHeightContent, isStatusFetching, size]);
  const created = (0, _react.useCallback)(() => {
    if (onAnimatedEndExpanded !== undefined) {
      (0, _reactNativeReanimated.runOnJS)(onAnimatedEndExpanded)();
    }

    (0, _reactNativeReanimated.runOnUI)(setMounted)(true);
    (0, _reactNativeReanimated.runOnJS)(setAddExtraSpace)(false);
  }, [onAnimatedEndExpanded]);
  const unmount = (0, _react.useCallback)(() => {
    if (onAnimatedEndCollapsed !== undefined) {
      (0, _reactNativeReanimated.runOnJS)(onAnimatedEndCollapsed)();
    }

    if (isUnmountedContent) {
      (0, _reactNativeReanimated.runOnJS)(setUnmountedContent)(true);
      setMounted(false);
      return;
    }
  }, [isUnmountedContent, onAnimatedEndCollapsed]);
  const progress = (0, _reactNativeReanimated.useDerivedValue)(() => open.value ? (0, _reactNativeReanimated.withTiming)(1, configExpanded, (0, _reactNativeReanimated.runOnJS)(created)) : (0, _reactNativeReanimated.withTiming)(0, configCollapsed, (0, _reactNativeReanimated.runOnJS)(unmount)));
  const style = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    height: size.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1
  }));
  const openAccordion = (0, _react.useCallback)(() => {
    (0, _reactNativeReanimated.runOnUI)(setUnmountedContent)(false);
    (0, _reactNativeReanimated.runOnUI)(() => {
      'worklet';

      size.value = handleHeightContent;
    })();
    open.value = !open.value;
    onChangeState && onChangeState(!open.value);
  }, [handleHeightContent, isMounted, onChangeState, open, size]);
  const hasLoader = (0, _react.useMemo)(() => isStatusFetching ? handleIndicatorFetching ? handleIndicatorFetching() : /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
    size: "small",
    color: "#AAAAAA",
    style: _styles.styles.indicator
  }) : /*#__PURE__*/_react.default.createElement(_chevron.default, {
    sizeIcon: sizeIcon,
    progress: progress,
    colorIcon: colorIcon,
    handleIcon: handleIcon,
    styleChevron: styleChevron,
    activeBackgroundIcon: activeBackgroundIcon,
    inactiveBackgroundIcon: inactiveBackgroundIcon
  }), [progress, sizeIcon, colorIcon, handleIcon, styleChevron, isStatusFetching, activeBackgroundIcon, inactiveBackgroundIcon, handleIndicatorFetching]);
  const renderHeader = (0, _react.useCallback)(() => {
    if (handleCustomTouchable === null) {
      return null;
    }

    return handleCustomTouchable !== undefined ? handleCustomTouchable(progress) : /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      style: [_styles.styles.header, styleTouchable]
    }, handleContentTouchable ? handleContentTouchable(progress) : null, isArrow ? hasLoader : null);
  }, [isArrow, hasLoader, open.value, styleTouchable, handleCustomTouchable, handleContentTouchable]);
  const content = (0, _react.useCallback)(() => {
    if (isUnmounted && !open.value) {
      return null;
    }

    if (!isMounted && !isUnmounted) {
      return /*#__PURE__*/_react.default.createElement(DefaultLoading, null);
    }

    return isMounted && renderContent ? renderContent(progress) : null;
  }, [isMounted, isUnmounted, open.value, renderContent]);
  const contentStyle = (0, _react.useMemo)(() => [_styles.styles.container, styleContainer], [styleContainer]);
  const containerAnimatedStyle = (0, _react.useMemo)(() => [_styles.styles.content, style], [style]);

  const touchableOnPress = _react.default.useCallback(() => {
    openAccordion();

    if (!open.value && !needsMoreSpaceForScroll) {
      onPressSideEffect();
    } else if (!open.value && needsMoreSpaceForScroll) {
      setAddExtraSpace(true);
    }

    ;
  }, [openAccordion, onPressSideEffect, open.value]);

  _react.default.useEffect(() => {
    if (needsMoreSpaceForScroll && addExtraSpace) {
      onPressSideEffect();
    }
  }, [addExtraSpace]);

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(TouchableComponent, _extends({
    onPress: touchableOnPress,
    disabled: disabled || isStatusFetching
  }, otherProperty), renderHeader()), /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: containerAnimatedStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: contentStyle
  }, content())), addExtraSpace ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height
    }
  }) : null);
});

exports.default = _default;
//# sourceMappingURL=accordion.js.map