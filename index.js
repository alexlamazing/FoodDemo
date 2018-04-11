const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Restaurant');
require('./models/RestaurantReview');
require('./services/passport');

mongoose.connect(keys.mongodbURL);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 7 * 24 * 60 * 60 * 1000,// 7 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/restaurantRoutes')(app);
require('./routes/searchRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // app.use(express.static('/client/build'));

  const path = require('path');
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(process.env.PORT || 5000);
