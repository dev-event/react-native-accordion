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
    isUnmountedContent = _constant.DEFAULT_UNMOUNTED_CONTENT_ACCORDION,
    activeBackgroundIcon = _constant.DEFAULT_ACTIVE_BACKGROUND_CHEVRON,
    initialMountedContent = _constant.DEFAULT_INITIAL_MOUNTED_CONTENT_ACCORDION,
    handleCustomTouchable,
    onAnimatedEndExpanded,
    onAnimatedEndCollapsed,
    handleContentTouchable,
    inactiveBackgroundIcon = _constant.DEFAULT_INACTIVE_BACKGROUND_CHEVRON,
    handleIndicatorFetching
  } = props;
  const [layout, onLayout] = (0, _hooks.useLayout)(0);
  const open = (0, _reactNativeReanimated.useSharedValue)(initExpand);
  const [isUnmounted, setUnmountedContent] = (0, _react.useState)(isUnmountedContent);
  const [isMounted, setMounted] = (0, _react.useState)(initialMountedContent);
  const handleHeightContent = (0, _react.useMemo)(() => renderContent === null ? 0 : contentHeight || layout.height || _constant.DEFAULT_CONTENT_HEIGHT, [contentHeight, layout.height, renderContent]);
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
  const progress = (0, _reactNativeReanimated.useDerivedValue)(() => open.value ? (0, _reactNativeReanimated.withTiming)(1, configExpanded, created) : (0, _reactNativeReanimated.withTiming)(0, configCollapsed, unmount));
  const style = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    height: size.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1
  }));
  const created = (0, _react.useCallback)(() => {
    if (onAnimatedEndExpanded !== undefined) {
      (0, _reactNativeReanimated.runOnJS)(onAnimatedEndExpanded)();
    }
  }, [onAnimatedEndExpanded]);
  const unmount = (0, _react.useCallback)(() => {
    if (onAnimatedEndCollapsed !== undefined) {
      (0, _reactNativeReanimated.runOnJS)(onAnimatedEndCollapsed)();
    }

    if (isUnmountedContent) {
      (0, _reactNativeReanimated.runOnJS)(setUnmountedContent)(true);
      return;
    }
  }, [isUnmountedContent, onAnimatedEndCollapsed]);
  const openAccordion = (0, _react.useCallback)(() => {
    if (size.value === 0) {
      if (!isMounted) setMounted(true);
      (0, _reactNativeReanimated.runOnUI)(setUnmountedContent)(false);
      (0, _reactNativeReanimated.runOnUI)(() => {
        'worklet';

        size.value = handleHeightContent;
      })();
    }

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

    return handleCustomTouchable !== undefined ? handleCustomTouchable() : /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      style: [_styles.styles.header, styleTouchable]
    }, handleContentTouchable ? handleContentTouchable() : null, isArrow ? hasLoader : null);
  }, [isArrow, hasLoader, styleTouchable, handleCustomTouchable, handleContentTouchable]);
  const content = (0, _react.useCallback)(() => {
    if (isUnmounted && !open.value) {
      return null;
    }

    return isMounted && renderContent ? renderContent() : null;
  }, [isMounted, isUnmounted, open.value, renderContent]);
  const contentStyle = (0, _react.useMemo)(() => [_styles.styles.container, styleContainer], [styleContainer]);
  const containerAnimatedStyle = (0, _react.useMemo)(() => [_styles.styles.content, style], [style]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, _extends({
    onPress: openAccordion,
    disabled: disabled || isStatusFetching
  }, otherProperty), renderHeader()), /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: containerAnimatedStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    onLayout: onLayout,
    style: contentStyle
  }, content())));
});

exports.default = _default;
//# sourceMappingURL=accordion.js.map