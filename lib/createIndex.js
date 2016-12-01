'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (_opts, state) {
  var indexes = {};
  var opts = _opts || {};
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
  configs.forEach(function (_ref3) {
    var name = _ref3.name,
        transform = _ref3.transform;

    var primary = name === 'keys';
    var index = Object.keys(state).map(function (itemKey) {
      if (indexKeys[itemKey]) {
        return false;
      }
      var key = transform(state[itemKey]);
      if (primary) {
        return key;
      }
      return { val: itemKey, key: key };
    }).filter(function (i) {
      return i;
    });
    if (primary) {
      indexes[name] = index;
    } else {
      indexes[name] = index.reduce(function (o, i) {
        return _extends({}, o, _defineProperty({}, i.key, i.val));
      }, {});
      if (index.length !== Object.keys(indexes[name]).length) {
        throw new Error('Duplicate Key: ' + name);
      }
    }
  });
  return _extends({}, state, indexes);
};

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }