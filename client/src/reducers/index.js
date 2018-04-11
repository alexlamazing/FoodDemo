import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import restaurantsReducer from './restaurantsReducer';
import restaurantReviewsReducer from './restaurantReviewsReducer';
import searchReducer from './searchReducer';
import restaurantThumbnailReducer from './restaurantThumbnailReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  restaurants: restaurantsReducer,
  restaurantReviews: restaurantReviewsReducer,
  searchResults: searchReducer,
  restaurantThumbnails: restaurantThumbnailReducer
});
