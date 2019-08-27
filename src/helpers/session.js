import _ from "lodash";

const COLLECTIONS = "collections";

export default {
  setCollections (collections) {
    localStorage.setItem(COLLECTIONS, JSON.stringify(collections));
  },
  getCollections () {
    const _collections = localStorage.getItem(COLLECTIONS);
    const parseResult = _.attempt(JSON.parse.bind(null, _collections));
    if (_.isError(parseResult)) {
      return [];
    }
    return JSON.parse(_collections);
  },
  clearCollections () {
    localStorage.removeItem(COLLECTIONS);
  },
  clearAll () {
    localStorage.clear();
  },
}
