'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (actionNames) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
      case actionNames.ADD:
        return mapKeys(_extends({}, state, action.items.reduce(function (obj, acc) {
          return _extends({}, obj, _defineProperty({}, (0, _uuid2.default)(), acc));
        }, {})));
      case actionNames.UPDATE:
        return _extends({}, state, Object.keys(action.items).reduce(function (obj, key) {
          return _extends({}, obj, _defineProperty({}, key, _extends({}, state[key], action.items[key])));
        }, {}));
      case actionNames.REMOVE:
        return mapKeys(Object.keys(state).reduce(function (obj, key) {
          return action.ids.indexOf(key) !== -1 ? obj : _extends({}, obj, _defineProperty({}, key, state[key]));
        }, {}));
      default:
        return state;
    }
  };
};

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function mapKeys(state) {
  return _extends({}, state, { keys: Object.keys(state).filter(function (k) {
      return k !== 'keys';
    }) });
}