import actions from './actions';
import reducer from './reducer';

const methods = ['ADD', 'UPDATE', 'REMOVE', 'REPLACE'];

export default function (storeName) {
  const actionNames = methods.reduce((obj, name) => ({ ...obj, ...{ [name]: `${storeName}_${name}` } }), {});
  return {
    actions: actionNames,
    reducer: reducer(actionNames),
    ...actions(actionNames),
  };
}
