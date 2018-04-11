import axios from 'axios';
import {
  FETCH_USER,
  // FETCH_RESTAURANTS,
  FETCH_RESTAURANT,
  FETCH_RECENT_RESTAURANTS,
  FETCH_RESTAURANT_REVIEWS,
  SEARCH_RESTAURANTS,
  UPLOAD_RESTAURANT_THUMBNAIL
} from './types';

export const fetchUser = () => {
  return function(dispatch) {
    axios.get('/api/current_user')
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
  };
};

export const submitRestaurant = (values, restaurantThumbnails, history) => {
  return function(dispatch) {

    if (restaurantThumbnails && restaurantThumbnails.length > 0) {
      // Push all the axios request promise into a single array
      restaurantThumbnails.map(file => {
        // Initial FormData
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "yjwgrogs"); // Replace the preset name with your own
        formData.append("api_key", "296635796453633"); // Replace API key with your own Cloudinary key
        formData.append("timestamp", (Date.now() / 1000) | 0);

        // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
        return axios.post("https://api.cloudinary.com/v1_1/dhfzqg2xt/image/upload", formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }).then(response => {
          const data = response.data;
          const fileURL = data.secure_url // You should store this URL for future references in your app
          // console.log(data);
          values["thumbnail"] = fileURL;
          axios.post('/api/restaurant', values)
          .then(res => {
            history.push(`/restaurant/${res.data._id}`);
            //can update user credit req.user.credits += 1;
            dispatch({ type: FETCH_RESTAURANT, payload: res.data });
          });

        })
      });
    } else {
      axios.post('/api/restaurant', values)
      .then(res => {
        history.push(`/restaurant/${res.data._id}`);
        dispatch({ type: FETCH_RESTAURANT, payload: res.data });
      });
    }

  };
};

export const fetchRecentRestaurants = () => {
  return function(dispatch) {
    axios.get('/api/restaurants/recent')
    .then(res => {
      dispatch({ type: FETCH_RECENT_RESTAURANTS, payload: res.data });
    });
  };
};

export const fetchRestaurant = (id) => {
  return function(dispatch) {
    axios.get(`/api/restaurant/${id}`)
    .then(res => {
      dispatch({ type: FETCH_RESTAURANT, payload: res.data });
    });
  };
};

export const fetchRestaurantReviews = (id) => {
  return function(dispatch) {
    axios.get(`/api/restaurant/${id}/reviews`)
    .then(res => {
      dispatch({ type: FETCH_RESTAURANT_REVIEWS, payload: res.data });
    });
  };
};

export const submitRestaurantReview = (values, restaurantId, history) => {
  return function(dispatch) {
    axios.post(`/api/restaurant/${restaurantId}/review`, values)
    .then(res => {
      window.location.reload();
      dispatch({ type: FETCH_RESTAURANT, payload: res.data });
    });
  };
};

export const searchRestaurants = (keyword, pageNum, history) => {
  return function(dispatch) {
    axios.get(`/api/search/${pageNum}`, {
      params: {
        keyword: keyword
      }
    })
    .then(res => {
      history.push(`/search/result/${pageNum}?keyword=${keyword}`);
      dispatch({ type: SEARCH_RESTAURANTS, payload: res.data });
    });
  };
};

export const uploadRestaurantThumbnail = (file) => {
  return function(dispatch) {
    dispatch({ type: UPLOAD_RESTAURANT_THUMBNAIL, payload: file });
  }
};
