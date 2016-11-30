"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (actionNames) {
  return {
    addItems: function addItems(_items) {
      var items = Array.isArray(_items) ? _items : [_items];
      return { type: actionNames.ADD, items: items };
    },
    updateItems: function updateItems(items) {
      return { type: actionNames.UPDATE, items: items };
    },
    removeItems: function removeItems(_ids) {
      var ids = Array.isArray(_ids) ? _ids : [_ids];
      return { type: actionNames.REMOVE, ids: ids };
    },
    replaceItems: function replaceItems(items) {
      return { type: actionNames.REPLACE, items: items };
    }
  };
};