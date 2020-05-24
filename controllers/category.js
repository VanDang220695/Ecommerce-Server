const createError = require('http-errors');

const Category = require('../models/category');

const create = async (req, res, next) => {
	try {
		const { userId } = req.userData;
		const { name } = req.body;
		const category = new Category({ name, user: userId });
		await category.save();
		res.status(201).json(category);
	} catch (error) {
		return next(createError(500, error.message));
	}
};

const update = async (req, res, next) => {
	try {
		const { userId } = req.userData;
		const { name, id } = req.body;
		await Category.findByIdAndUpdate(id, { name, userId });
		res.status(200).json();
	} catch (error) {
		if (error.name === 'CastError') {
			return next(createError(404));
		}
		return next(createError(500, error.message));
	}
};

const getAll = async (req, res, next) => {
	try {
		const category = await Category.find({});
		if (!category) {
			return next(createError(404));
		}
		res.json({ category });
	} catch (error) {
		if (error.name === 'CastError') {
			return next(createError(404));
		}
		next(createError(500, error.message));
	}
};

const getOne = async (req, res, next) => {
	try {
		const { id } = req.body;
		const category = await Category.findById(id);
		if (!category) {
			return next(createError(404));
		}
		res.json({ category });
	} catch (error) {
		if (error.name === 'CastError') {
			return next(createError(404));
		}
		next(createError(500, error.message));
	}
};

const deleteCategory = async (req, res, next) => {
	try {
		const category = await Category.findById(req.body.id);
		if (!category) {
			return next(createError(404));
		}
		await category.remove();

		res.json();
	} catch (error) {
		if (error.name === 'CastError') {
			return next(createError(404));
		}
		next(createError(500, error.message));
	}
};

module.exports = {
	create,
	getOne,
	getAll,
	deleteCategory,
	update,
};
