'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (actionNames) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { keys: [] };
    var action = arguments[1];

    switch (action.type) {
      case actionNames.ADD:
        return mapKeys(opts, _extends({}, state, action.items.reduce(function (obj, acc) {
          var key = acc.key || (0, _uuid2.default)();
          return _extends({}, obj, _defineProperty({}, key, _extends({}, acc, { key: key })));
        }, {})));
      case actionNames.UPDATE:
        return _extends({}, state, Object.keys(action.items).reduce(function (obj, key) {
          return _extends({}, obj, _defineProperty({}, key, _extends({}, state[key], action.items[key])));
        }, {}));
      case actionNames.REMOVE:
        return mapKeys(opts, Object.keys(state).reduce(function (obj, key) {
          return action.ids.indexOf(key) !== -1 ? obj : _extends({}, obj, _defineProperty({}, key, state[key]));
        }, {}));
      case actionNames.REPLACE:
        return mapKeys(opts, _extends({}, action.items.reduce(function (obj, acc) {
          var key = acc.key || (0, _uuid2.default)();
          return _extends({}, obj, _defineProperty({}, key, _extends({}, acc, { key: key })));
        }, {})));
      default:
        return state;
    }
  };
};

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function mapKeys(opts, state) {
  var indexes = {};
  var configs = (opts.indexes || []).concat([{
    name: 'keys',
    transform: function transform(_ref) {
      var key = _ref.key;
      return key;
    }
  }]);
  var indexKeys = configs.reduce(function (o, _ref2) {
    var name = _ref2.name;
    return _extends({}, o, _defineProperty({}, name, true));
  }, {});
  console.log('GOT HERE', { configs: configs, indexKeys: indexKeys });
  configs.forEach(function (_ref3) {
    var name = _ref3.name,
        transform = _ref3.transform;

    indexes[name] = Object.keys(state).map(function (itemKey) {
      console.log('itemKey', itemKey, indexKeys[itemKey]);
      if (indexKeys[itemKey]) {
        return false;
      }
      console.log('returning key', state, itemKey, transform(state[itemKey]));
      return transform(state[itemKey]);
    }).filter(function (i) {
      return i;
    });
  });
  console.log({ indexes: indexes, configs: configs });
  return _extends({}, state, indexes);
}