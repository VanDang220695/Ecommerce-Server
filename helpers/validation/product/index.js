const { check } = require('express-validator');

const validationProductId = [
	check('id', 'Product id is required').not().isEmpty(),
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

const validationUpdateProduct = validationProduct.concat(validationProductId);

module.exports = {
	validationProduct,
	validationProductId,
	validationUpdateProduct,
};
