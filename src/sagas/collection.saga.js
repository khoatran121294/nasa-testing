import { put, takeLatest, select, all } from "redux-saga/effects";
import { SAVE_COLLECTION, SAVE_COLLECTIONS, DELETE_COLLECTION, TOGGLE_FAVOURITE } from "../actions";
import _ from "lodash";
import Session from "../helpers/session";

function* saveCollection ({ collection }) {
  const collectionStore = yield select(state => state.collectionStore);
  let { collections } = collectionStore;
  const existedCollection = collections.find(item => item.nasa_id === collection.nasa_id);
  if (!existedCollection) {
    collections.push({
      ...collection,
    });
  }
  else {
    collections = collections.map(item => {
      if (item.nasa_id === collection.nasa_id) {
        return {
          ...item,
          ...collection,
        };
      }
      return item;
    });
  }
  Session.setCollections(collections);
  yield put({ type: SAVE_COLLECTIONS, collections });
}
function* deleteCollection ({ nasa_id }) {
  const collectionStore = yield select(state => state.collectionStore);
  const { collections } = collectionStore;
  const updatedCollections = collections.filter(item => item.nasa_id !== nasa_id);
  Session.setCollections(updatedCollections);
  yield put({ type: SAVE_COLLECTIONS, collections: updatedCollections });
};
function* toggleFavourite ({ nasa_id }) {
  const collectionStore = yield select(state => state.collectionStore);
  const { collections } = collectionStore;
  const updatedCollections = collections.map(item => {
    if (item.nasa_id === nasa_id) {
      item.featured = !item.featured;
    }
    return item;
  });
  Session.setCollections(updatedCollections);
  yield put({ type: SAVE_COLLECTIONS, collections: updatedCollections });
};

export function* watchCollectionSagasAsync() {
  yield all([
    takeLatest(SAVE_COLLECTION, saveCollection),
    takeLatest(DELETE_COLLECTION, deleteCollection),
    takeLatest(TOGGLE_FAVOURITE, toggleFavourite),
  ]);
}
