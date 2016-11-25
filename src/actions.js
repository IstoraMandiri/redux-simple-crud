export default function (actionNames) {
  return {
    addItems(_items) {
      const items = Array.isArray(_items) ? _items : [_items];
      return { type: actionNames.ADD, items };
    },
    updateItems(items) {
      return { type: actionNames.UPDATE, items };
    },
    removeItems(_ids) {
      const ids = Array.isArray(_ids) ? _ids : [_ids];
      return { type: actionNames.REMOVE, ids };
    },
  };
}
