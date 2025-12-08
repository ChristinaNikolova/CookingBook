export const data = {
  map: (collection, key, value) => {
    return collection.map((x) => ({ ...x, [key]: value }));
  },
};
