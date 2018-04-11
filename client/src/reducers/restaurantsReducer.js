import { FETCH_RESTAURANTS, FETCH_RESTAURANT, FETCH_RECENT_RESTAURANTS } from '../actions/types';

const INITIAL_STATE = { all: [], restaurant: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_RESTAURANTS:
      return { ...state, all: action.payload };
    case FETCH_RESTAURANT:
      return { ...state, restaurant: action.payload };
    case FETCH_RECENT_RESTAURANTS:
      return { ...state, recentRestaurants: action.payload };
    default:
      return state;
  }
}
