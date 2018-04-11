const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  nameBig5: String,
  nameEng: String,
  thumbnail: String,
  address: String,
  tel: String,
  _createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  restaurantReviews: [{
    type: Schema.Types.ObjectId,
    ref: 'RestaurantReview'
  }],
}, { timestamps: true });

restaurantSchema.plugin(mongoosePaginate);

mongoose.model('restaurants', restaurantSchema);
