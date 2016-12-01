import uuid from 'uuid';
import createIndex from './createIndex';

export default function (actionNames, opts = {}) {
  return (state = { keys: [] }, action) => {
    switch (action.type) {
      case actionNames.ADD:
        return createIndex(opts, {
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
        return createIndex(opts, Object.keys(state).reduce((obj, key) => {
          return action.ids.indexOf(key) !== -1 ? obj : { ...obj, [key]: state[key] };
        }, {}));
      case actionNames.REPLACE:
        return createIndex(opts, {
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
