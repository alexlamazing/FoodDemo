const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  emails: [String],
  avatarURL: String,
  gender: String,
  credits: { type: Number, default: 0 },
  lastLogin: Date
}, { timestamps: true });

mongoose.model('users', userSchema);
