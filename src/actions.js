export function getActions(storeName) {
  return ['ADD', 'UPDATE', 'REMOVE'].reduce((obj, name) => ({ ...obj, ...{ [name]: `${storeName}_${name}` } }), {});
}

export function getMethods(storeName) {
  const actions = getActions(storeName);
  return {
    addItems(_items) {
      const items = Array.isArray(_items) ? _items : [_items];
      return { type: actions.ADD, items };
    },
    editItems(items) {
      return { type: actions.UPDATE, items };
    },
    removeItems(_ids) {
      const ids = Array.isArray(_ids) ? _ids : [_ids];
      return { type: actions.REMOVE, ids };
    },
  };
}

export default function (storeName) {
  return {
    actions: getActions(storeName),
    ...getMethods(storeName),
  };
}
