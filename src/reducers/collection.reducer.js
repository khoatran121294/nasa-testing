import { SAVE_COLLECTIONS } from "../actions";
import Session from "../helpers/session";

const initialState = {
  collections: Session.getCollections() || [],
};

export default function collectionReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_COLLECTIONS:
      return {
        ...state,
        collections: action.collections
      };
    default:
      return state;
  }
}
