function getFromCatalogPath(json, path) {
  let catalog = json.catalog;
  if (!catalog) {
    throw new Error('No catalog found');
  }

  const item = findInItems(catalog, path);
  if (!item) {
    throw new Error('Could not find catalog item for path: ' + path.join(','));
  }
  return item;
}

function findInItems(items, path) {
  const first = path[0];
  const rest = path.slice(1);

  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    if (item.name === first) {
      if (rest.length === 0) {
        return item;
      } else {
        const match = findInItems(item.items, rest);
        if (match) {
          return match;
        }
      }
    }
  }
  return undefined;
}

module.exports = getFromCatalogPath;