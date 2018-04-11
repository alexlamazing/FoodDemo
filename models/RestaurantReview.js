const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantReviewSchema = new Schema({
  subject: String,
  message: String,
  rating: { type: Number, min: 0, max: 5, default: 0 },
  _createdBy : { type: Schema.Types.ObjectId, ref: 'User' },
  _restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' }
}, { timestamps: true });

mongoose.model('restaurantreviews', restaurantReviewSchema);
