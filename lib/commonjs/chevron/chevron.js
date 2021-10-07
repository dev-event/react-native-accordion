"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeRedash = require("react-native-redash");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Chevron = ({
  sizeIcon,
  progress,
  colorIcon,
  handleIcon,
  styleChevron,
  activeBackgroundIcon,
  inactiveBackgroundIcon
}) => {
  const style = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    // @ts-ignore
    backgroundColor: (0, _reactNativeRedash.mixColor)(progress.value, inactiveBackgroundIcon, activeBackgroundIcon),
    transform: [{
      rotateZ: `${(0, _reactNativeRedash.mix)(progress.value, 0, Math.PI)}rad`
    }]
  }));
  const hasIcon = (0, _react.useMemo)(() => /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, {
    width: sizeIcon,
    height: sizeIcon,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
    d: "M6 9l6 6 6-6",
    stroke: colorIcon
  })), [colorIcon, sizeIcon]);
  const renderIcon = (0, _react.useCallback)(() => {
    if (handleIcon === null) {
      return null;
    }

    return handleIcon !== undefined ? handleIcon(progress) : hasIcon;
  }, [handleIcon, hasIcon, progress]);
  const containerAnimatedStyle = (0, _react.useMemo)(() => [styles.container, style, styleChevron], [style, styleChevron]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: containerAnimatedStyle
  }, renderIcon());
};

var _default = Chevron;
exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#525251'
  }
});
//# sourceMappingURL=chevron.js.map