import { all, fork } from "redux-saga/effects";
import { watchCollectionSagasAsync } from "./collection.saga";

export default function* sagas() {
  yield all([fork(watchCollectionSagasAsync)]);
}
