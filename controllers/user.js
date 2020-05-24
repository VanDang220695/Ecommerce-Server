const createError = require('http-errors');

const User = require('../models/user');

const userById = async (req, res, next, id) => {
	try {
		const user = await User.findById(id).exec();
		if (!user) {
			return next(createError(403, 'Access denied'));
		}
		req.profile = user;
		next();
	} catch (error) {
		if (error.name === 'CastError') {
			return next(createError(404, 'User not found'));
		}

		return next(new createError[500]());
	}
};

module.exports = {
	userById,
};
