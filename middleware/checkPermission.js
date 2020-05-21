const createError = require('http-errors');

const checkRoleAdmin = (req, res, next) => {
  if (req.userData.role === 0) {
    return next(createError(403, 'Admin resource! Access denied'));
  }
  next();
};

const checkPermission = (req, res, next) => {
  const { user } = req;
  const { userId } = req.body;

  if (req.user.role === 0) {
    return next(createError(403, 'Admin resource! Access denied'));
  }
  next();
};

module.exports = {
  checkRoleAdmin,
  checkPermission,
};
