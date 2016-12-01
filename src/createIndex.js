export default function (_opts, state) {
  const indexes = {};
  const opts = _opts || {};
  const configs = (opts.indexes || []).concat([{
    name: 'keys',
    transform: ({ key }) => key,
  }]);
  const indexKeys = configs.reduce((o, { name }) => ({ ...o, [name]: true }), {});
  configs.forEach(({ name, transform }) => {
    const primary = name === 'keys';
    const index = Object.keys(state).map((itemKey) => {
      if (indexKeys[itemKey]) { return false; }
      const key = transform(state[itemKey]);
      if (primary) { return key; }
      return { val: itemKey, key };
    }).filter(i => i);
    if (primary) {
      indexes[name] = index;
    } else {
      indexes[name] = index.reduce((o, i) => ({ ...o, [i.key]: i.val }), {});
      if (index.length !== Object.keys(indexes[name]).length) {
        throw new Error(`Duplicate Key: ${name}`);
      }
    }
  });
  return { ...state, ...indexes };
}
