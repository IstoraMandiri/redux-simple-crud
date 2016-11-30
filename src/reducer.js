import uuid from 'uuid';

function mapKeys(state) {
  return { ...state, keys: Object.keys(state).filter(k => k !== 'keys') };
}

export default function (actionNames) {
  return (state = { keys: [] }, action) => {
    switch (action.type) {
      case actionNames.ADD:
        return mapKeys({
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
        return mapKeys(Object.keys(state).reduce((obj, key) => {
          return action.ids.indexOf(key) !== -1 ? obj : { ...obj, [key]: state[key] };
        }, {}));
      case actionNames.REPLACE:
        return mapKeys({
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
