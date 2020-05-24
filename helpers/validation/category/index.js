const { check } = require('express-validator');

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

module.exports = {
	validationCategory,
};
