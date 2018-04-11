const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('users');
const Restaurant = mongoose.model('restaurants');
const RestaurantReview = mongoose.model('restaurantreviews');

const RESULTS_PER_PAGE = 12;

module.exports = app => {

  app.get('/api/search/:pageNum', (req, res) => {

    const pageNum = req.params.pageNum;
    const populateQuery = [
      { path: 'restaurantReviews', model: RestaurantReview }
    ];

    const query = {
      $or:[
        {nameEng: new RegExp(req.query.keyword, "i")},
        {nameBig5: new RegExp(req.query.keyword, "i")},
        {address: new RegExp(req.query.keyword, "i")}
      ]
    };
    const options = {
      sort: { year: -1, createdAt: -1 },
      populate: populateQuery,
      lean: true,
      page: pageNum,
      limit: RESULTS_PER_PAGE
    };

    Restaurant.paginate(query, options, (err, result) => {
      if (result && result.total > 0) {
        res.status(200).json(result.docs);
      } else {
        res.status(200).json({ message: 'No matching restaurant' });
      }
    });

  });

};
