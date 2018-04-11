import { SEARCH_RESTAURANTS } from '../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH_RESTAURANTS:
      return action.payload;
    default:
      return state;
  }
}
