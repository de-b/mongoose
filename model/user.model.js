const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  //db modelling
  name: String,
  phoneNumber: Number,
  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    temp_addr: [String],
    permanent_addr: String,
  },
  dob: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'others'],
  },
  role: {
    type: Number, //1 for admin, 2 for end user
    default: 2,
  },
  //   avatar: Image,
  numberOfPosts: Number,
  status: {
    type: String,
    default: 'active',
    // you can do status true / false directly as well
  },
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// bcrypt.genSalt(10, function (err, salt) {
//   bcrypt.hash('B4c0//', salt, function (err, hash) {
//     // Store hash in your password DB.
//   });
// });

const userModel = mongoose.model('user', UserSchema);

module.exports = userModel;
