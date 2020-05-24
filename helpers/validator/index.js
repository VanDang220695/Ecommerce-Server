const createError = require('http-errors');
const { check, validationResult } = require('express-validator');

const validationUserLogin = [
	check('email', 'Email is not valid').isEmail(),
	check('password', 'Password is required').notEmpty(),
	check('password')
		.isLength({ min: 6 })
		.withMessage('Password must contain at least 6 characters')
		.matches(/\d/)
		.withMessage('Password must contain at least a number'),
];

const validationProductId = [
	check('id', 'Product id is required').not().isEmpty(),
];

const validationUserSignup = [
	check('name', 'Name is required').notEmpty(),
	...validationUserLogin,
];

const validationProduct = [
	check('name', 'Name is not valid').notEmpty().isLength({ max: 32 }),
	check('description', 'Description is required')
		.notEmpty()
		.isLength({ max: 2000 })
		.withMessage('Description is not valid'),
	check('price', 'Price is required').isNumeric(),
	check('category', 'Category is required').notEmpty(),
	check('image', 'Image is required').not().isEmpty(),
];

const validationCategory = [
	check('name', 'Category name is required')
		.not()
		.isEmpty()
		.isLength({
			min: 4,
			max: 20,
		})
		.withMessage('Category name is not valid'),
];

const validationUpdateProduct = validationProduct.concat(validationProductId);

const handlerValidationResult = (validations) => async (req, res, next) => {
	const imagePath = req.file ? req.file.path : null;
	req.body.image = imagePath;
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
	validationCategory,
	validationProductId,
	validationUpdateProduct,
	handlerValidationResult,
};
