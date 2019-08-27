import { combineReducers } from "redux";
import collectionReducer from "./collection.reducer";

export default combineReducers({
  collectionStore: collectionReducer,
});
