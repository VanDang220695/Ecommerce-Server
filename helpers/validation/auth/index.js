const { check } = require('express-validator');

const validationUserLogin = [
	check('email', 'Email is not valid').isEmail(),
	check('password', 'Password is required').notEmpty(),
	check('password')
		.isLength({ min: 6 })
		.withMessage('Password must contain at least 6 characters')
		.matches(/\d/)
		.withMessage('Password must contain at least a number'),
];
const validationUserSignup = [
	check('name', 'Name is required').notEmpty(),
	...validationUserLogin,
];

module.exports = {
	validationUserLogin,
	validationUserSignup,
};
