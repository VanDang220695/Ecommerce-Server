const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = (req, res, next) => {
	try {
		const { authorization } = req.headers;

		const token = authorization && authorization.split(' ')[1]; // Authorization: 'Bear TOKEN'
		if (!token || !jwt.verify(token, process.env.JWT_SECRET)) {
			return next(createError(401));
		}
		const decodedToken = jwt.decode(token, process.env.JWT_KEY);

		req.userData = { userId: decodedToken.id, role: decodedToken.role };
		next();
	} catch (error) {
		const { name, message } = error;
		if (name === 'TokenExpiredError' || name === 'JsonWebTokenError') {
			return next(createError(401));
		}
		next(createError(500, message));
	}
};
