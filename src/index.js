// let's create our redux store
import getActions from './actions';
import getReducer from './reducer';

export default function (storeName) {
  const crud = getActions(storeName);
  crud.reducer = getReducer(crud);
  return crud;
}
