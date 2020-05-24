const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const genToken = (user) =>
	jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
		expiresIn: '4h',
	});

const signup = async (req, res, next) => {
	try {
		const { email, password, name } = req.body;

		const existUser = await User.findOne({ email });
		if (existUser) {
			return next(createError(409, 'User is existed'));
		}

		const salt = bcrypt.genSaltSync(Number(process.env.SALT));
		const hashPassword = bcrypt.hashSync(password, salt);

		const user = new User({ email, password: hashPassword, name });
		await user.save();
		const token = genToken(user);
		res.status(201).json({ token });
	} catch (error) {
		next(createError(500, error.message));
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email }).select('_id role password');
		// Check Authentication
		if (!user || !bcrypt.compareSync(password, user.password)) {
			return next(createError(401, 'Wrong email or password'));
		}
		const token = genToken(user);
		return res.json({ token });
	} catch (error) {
		next(createError(500, error.message));
	}
};

module.exports = {
	signup,
	login,
};
