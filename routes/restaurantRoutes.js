const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Restaurant = mongoose.model('restaurants');
const RestaurantReview = mongoose.model('restaurantreviews'); // for populate
const User = mongoose.model('users'); // for populate

const RESTAURANTS_PER_PAGE = 12;

module.exports = app => {

  app.post('/api/restaurant', requireLogin, (req, res) => {

    const { nameBig5, nameEng, thumbnail, address, tel } = req.body;

    const restaurant = new Restaurant({
      nameBig5: nameBig5,
      nameEng: nameEng,
      thumbnail: thumbnail,
      address: address,
      tel: tel,
      _createdBy: req.user.id
    });

    restaurant.save()
    .then(res.status(200).json(restaurant));

  });

  app.get('/api/restaurants/recent', (req, res) => {

    const populateQuery = [
      { path: 'restaurantReviews', model: RestaurantReview }
    ];

    const offset = req.query && req.query.offset ? Number(req.query.offset) : 0;

    const query = {};
    const options = {
      sort: { createdAt: -1 },
      populate: populateQuery,
      lean: true,
      offset: offset,
      limit: RESTAURANTS_PER_PAGE
    };

    Restaurant.paginate(query, options, (err, result) => {
      if (result && result.total > 0) {
        res.status(200).json(result.docs);
      } else {
        res.status(200).json({ message: 'No restaurant' });
      }
    });

  });

  app.get('/api/restaurants', (req, res) => {

    const limit = req.query.limit ? Number(req.query.limit) : RESTAURANTS_PER_PAGE;
    const offset = req.query.offset ? Number(req.query.offset) : 0;

    const populateQuery = [
      { path: 'restaurantReviews', model: RestaurantReview }
    ];

    const query = {};
    const options = {
      sort: { createdAt: -1 },
      populate: populateQuery,
      lean: true,
      offset: offset,
      limit: limit
    };

    Restaurant.paginate(query, options, (err, result) => {
      if (result && result.total > 0) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: 'No restaurant' });
      }
    });

  });

  app.get('/api/restaurant/:id', (req, res) => {

    const populateQuery = [
      { path: '_createdBy', model: User },
      { path: 'restaurantReviews', model: RestaurantReview, populate: { path: '_createdBy', model: User } }
    ];
    Restaurant.findOne({ _id: req.params.id })
    .populate(populateQuery)
    .exec((err, restaurant) => {
      if (err) {
        res.status(200).json({ message: 'Error' });
      }
      res.status(200).json(restaurant);
    });

  });



  app.post('/api/restaurant/:id/review', requireLogin, (req, res) => {

    const { subject, message, rating } = req.body;

    const populateQuery = [
      { path: '_createdBy', model: User },
      { path: 'restaurantReviews', model: RestaurantReview, populate: { path: '_createdBy', model: User } }
    ];

    const restaurantReview = new RestaurantReview({
      subject: subject,
      message: message,
      rating: rating,
      _createdBy: req.user.id,
      _book: mongoose.Types.ObjectId(req.params.id)
    });

    Restaurant.findOne({ _id: req.params.id })
    .populate(populateQuery)
    .exec((err, restaurant) => {
      restaurant.restaurantReviews.push(restaurantReview);
      restaurant.save()
      .then(
        restaurantReview.save()
        .then(res.status(200).json(restaurant))
      );
    });

  });

  app.get('/api/restaurant/:id/reviews', (req, res) => {

    Restaurant.findOne({ _id: req.params.id })
    .populate({
      path: 'restaurantReviews',
      model: RestaurantReview,
      populate: { path: '_createdBy', model: User }
    })
    .exec((err, restaurant) => {
      if (err) {
        console.log(err);
        res.status(200).json({ message: 'error' });
      }
      res.status(200).json(restaurant.restaurantReviews);
    });

  });


};
