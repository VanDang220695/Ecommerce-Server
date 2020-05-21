const createError = require('http-errors');
const { check, validationResult } = require('express-validator');

const validationUserSignup = [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Email must be between 3 to 32 characters')
    .matches(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/)
    .withMessage('Email is not valid')
    .isLength({
      min: 4,
      max: 32,
    }),
  check('password', 'Password is required').notEmpty(),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must contain at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain at least a number'),
];

const validationProduct = [
  check('name', 'Name is not valid').notEmpty().isLength({ max: 32 }),
  check('description', 'Description is not valid').notEmpty().isLength({ max: 2000 }),
  check('price', 'Price is required').notEmpty().isNumeric(),
  check('category', 'Category is not empty').notEmpty(),
];

const validationUserLogin = [
  check('email', 'Email must be between 3 to 32 characters')
    .matches(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/)
    .withMessage('Email is not valid')
    .isLength({
      min: 4,
      max: 32,
    }),
  check('password', 'Password is required').notEmpty(),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must contain at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain at least a number'),
];

const handlerValidationResult = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const data = errors.array().map((err) => {
    const { param, msg } = err;
    return {
      [param]: msg,
    };
  });
  const error = createError(400, 'Validation fail', { data });
  return next(error);
};

module.exports = {
  validationUserSignup,
  validationUserLogin,
  validationProduct,
  handlerValidationResult,
};
