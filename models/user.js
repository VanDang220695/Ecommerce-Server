const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v1 } = require('uuid');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

// Hash password
userSchema.pre('save', function (next) {
  console.log(this.isModified('password'));
  if (!this.isModified('password')) {
    return next();
  }
  this.salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, this.salt);
  next();
});

userSchema.methods.comparePassword = function (plaintext) {
  return bcrypt.compareSync(plaintext, this.password);
};

module.exports = mongoose.model('User', userSchema);
