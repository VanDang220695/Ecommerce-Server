const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const genToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return next(createError(409, 'User is existed'));
    }

    const user = new User(req.body);
    await user.save();
    const token = genToken(user);
    res.status(201).json({ token });
  } catch (error) {
    next(createError(500, error.message));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('_id role password');

    // Check Authentication
    if (!user.comparePassword(password)) {
      return next(new createError[401]());
    }
    const token = genToken(user);
    return res.json({ token });
  } catch (error) {
    next(createError(500, error.message));
  }
};

module.exports = {
  signup,
  login,
};
