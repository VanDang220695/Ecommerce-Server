const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bear TOKEN'
    if (!token || !jwt.verify(token, process.env.JWT_SECRET)) {
      throw new Error('Authentication failed');
    }
    const decodedToken = jwt.decode(token, process.env.JWT_KEY);

    req.userData = { userId: decodedToken.id, role: decodedToken.role };
    next();
  } catch (error) {
    next(createError(500, error.message));
  }
};
