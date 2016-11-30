import uuid from 'uuid';

function mapKeys(opts, state) {
  const indexes = {};
  const configs = (opts.indexes || []).concat([{
    name: 'keys',
    transform: ({ key }) => key,
  }]);
  const indexKeys = configs.reduce((o, { name }) => ({ ...o, [name]: true }), {});
  configs.forEach(({ name, transform }) => {
    indexes[name] = Object.keys(state).map((itemKey) => {
      if (indexKeys[itemKey]) { return false; }
      return transform(state[itemKey]);
    }).filter(i => i);
  });
  return { ...state, ...indexes };
}

export default function (actionNames, opts = {}) {
  return (state = { keys: [] }, action) => {
    switch (action.type) {
      case actionNames.ADD:
        return mapKeys(opts, {
          ...state,
          ...action.items.reduce((obj, acc) => {
            const key = acc.key || uuid();
            return { ...obj, [key]: { ...acc, key } };
          }, {}),
        });
      case actionNames.UPDATE:
        return {
          ...state,
          ...Object.keys(action.items).reduce((obj, key) => {
            return { ...obj, [key]: { ...state[key], ...action.items[key] } };
          }, {}),
        };
      case actionNames.REMOVE:
        return mapKeys(opts, Object.keys(state).reduce((obj, key) => {
          return action.ids.indexOf(key) !== -1 ? obj : { ...obj, [key]: state[key] };
        }, {}));
      case actionNames.REPLACE:
        return mapKeys(opts, {
          ...action.items.reduce((obj, acc) => {
            const key = acc.key || uuid();
            return { ...obj, [key]: { ...acc, key } };
          }, {}),
        });
      default:
        return state;
    }
  };
}
