'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (storeName, opts) {
  var actionNames = methods.reduce(function (obj, name) {
    return _extends({}, obj, _defineProperty({}, name, storeName + '_' + name));
  }, {});
  return _extends({
    actions: actionNames,
    reducer: (0, _reducer2.default)(actionNames, opts)
  }, (0, _actions2.default)(actionNames));
};

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var methods = ['ADD', 'UPDATE', 'REMOVE', 'REPLACE'];