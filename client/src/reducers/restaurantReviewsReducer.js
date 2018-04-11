import { FETCH_RESTAURANT_REVIEWS, FETCH_RESTAURANT_REVIEW } from '../actions/types';

const INITIAL_STATE = { all: [], review: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_RESTAURANT_REVIEWS:
      return { ...state, all: action.payload };
    case FETCH_RESTAURANT_REVIEW:
      return { ...state, reivew: action.payload };
    default:
      return state;
  }
}
