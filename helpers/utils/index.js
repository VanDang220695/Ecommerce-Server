const { validationResult } = require('express-validator');
const createError = require('http-errors');

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
	handlerValidationResult,
};
