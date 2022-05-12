"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _invariant = _interopRequireDefault(require("invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useValidator = ({
  initialMountedContent
}) => {
  (0, _react.useMemo)(() => {
    (0, _invariant.default)(typeof initialMountedContent === 'boolean', `'initialMountedContent' was provided but with wrong type ! expected type is a boolean.`); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

var _default = useValidator;
exports.default = _default;
//# sourceMappingURL=index.js.map