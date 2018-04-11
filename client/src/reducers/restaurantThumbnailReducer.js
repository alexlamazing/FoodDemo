import { UPLOAD_RESTAURANT_THUMBNAIL } from '../actions/types';

const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPLOAD_RESTAURANT_THUMBNAIL:
      return action.payload;
    default:
      return state;
  }
}
