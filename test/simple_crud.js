import assert from 'assert';
import simpleCrud from '../src';
const { reducer, actions, addItems, editItems, removeItems } = simpleCrud('TEST');

const inserts = [
  { name: 'test' },
  { name: 'test2' },
  { name: 'test3' },
];

const testIds = ['test1', 'test2'];

describe('SimpleCrud', function () {
  describe('Actions', function () {
    describe('addItems', function () {
      it('returns a single passed account', function () {
        assert.deepEqual(addItems(inserts[0]), { type: actions.ADD, items: [inserts[0]] });
      });
      it('returns multiple passed items', function () {
        assert.deepEqual(addItems(inserts), { type: actions.ADD, items: inserts });
      });
    });
    describe('editItems', function () {
      it('returns a single passed account', function () {
        const items = { [testIds[0]]: { test: 'test' } };
        assert.deepEqual(editItems(items), { type: actions.UPDATE, items });
      });
      it('returns a single passed account', function () {
        const items = { [testIds[1]]: { test: 'test' }, [testIds[0]]: { test: 'test' } };
        assert.deepEqual(editItems(items), { type: actions.UPDATE, items });
      });
    });
    describe('removeItems', function () {
      it('returns IDs to remove with single item', function () {
        const id = 'test';
        const expected = { type: actions.REMOVE, ids: [id] };
        assert.deepEqual(removeItems(id), expected);
      });
      it('returns IDs to remove with multiple items', function () {
        const ids = ['test', 'test2'];
        const expected = { type: actions.REMOVE, ids };
        assert.deepEqual(removeItems(ids), expected);
      });
    });
  });

  describe('Reducer', function () {
    it('handles initial state', function () {
      assert.deepEqual(reducer(undefined, {}), {});
    });
    describe(actions.ADD, function () {
      it('handles single item', function () {
        const test = { type: actions.ADD, items: [inserts[0]] };
        const result = reducer({}, test);
        assert.equal(result.keys.length, 1);
        assert.deepEqual(result[Object.keys(result)[0]], inserts[0]);
      });
      it('handles multiple items', function () {
        const test = { type: actions.ADD, items: inserts };
        const result = reducer({}, test);
        assert.equal(result.keys.length, inserts.length);
        inserts.forEach((account) => {
          assert(Object.keys(result).find((acc) => result[acc].name && result[acc].name === account.name));
        });
      });
    });
    describe(actions.UPDATE, function () {
      it('handles single item', function () {
        const store = reducer({}, { type: actions.ADD, items: inserts });
        const key = Object.keys(store)[0];
        const obj = { a: 1 };
        const update = { [key]: obj };
        const updated = { [key]: { ...store[key], ...obj } };
        const expected = { ...store, ...updated };
        const result = reducer(store, { type: actions.UPDATE, items: update });
        assert.deepEqual(result, expected);
      });
      it('handles multiple items', function () {
        const store = reducer({}, { type: actions.ADD, items: inserts });
        const [...keys] = Object.keys(store);
        const obj = { a: 1 };
        const update = { [keys[0]]: obj, [keys[1]]: obj };
        const updated = { [keys[0]]: { ...store[keys[0]], ...obj }, [keys[1]]: { ...store[keys[1]], ...obj } };
        const expected = { ...store, ...updated };
        const result = reducer(store, { type: actions.UPDATE, items: update });
        assert.deepEqual(result, expected);
      });
    });
    describe(actions.REMOVE, function () {
      it('handles single item', function () {
        const store = reducer({}, { type: actions.ADD, items: inserts });
        delete store.keys;
        const id = Object.keys(store)[0];
        const test = { type: actions.REMOVE, ids: [id] };
        const result = reducer(store, test);
        delete store[id];
        delete result.keys;
        assert.deepEqual(result, store);
      });
      it('handles multiple items', function () {
        const store = reducer({}, { type: actions.ADD, items: inserts });
        const [...ids] = Object.keys(store)[0];
        const test = { type: actions.REMOVE, ids: [ids[0], ids[1]] };
        const result = reducer(store, test);
        delete store[ids[0]];
        delete store[ids[1]];
        assert.deepEqual(result, store);
      });
    });
  });
});
