const fs = require('fs');
const mongoose = require('mongoose');
const createError = require('http-errors');
const _lodash = require('lodash');

const Product = require('../models/product');
const Category = require('../models/category');
const User = require('../models/user');

const create = async (req, res, next) => {
	try {
		const {
			name,
			description,
			price,
			category,
			quantity,
			shipping = false,
		} = req.body;
		const { userId } = req.userData;

		const product = new Product({
			name,
			description,
			price,
			category,
			quantity,
			shipping,
			image: req.file.path,
			user: userId,
		});
		await product.save();
		res.status(201).json(product);
	} catch (error) {
		next(createError(500, error.message));
	}
};

const update = async (req, res, next) => {
	try {
		const {
			name,
			description,
			price,
			category,
			quantity,
			shipping,
			id,
		} = req.body;

		const product = await Product.findById(id);

		if (!product) {
			return next(createError(404));
		}
		const newProduct = {
			name,
			description,
			price,
			category,
			quantity,
			shipping,
			image: req.file.path,
		};
		await Product.findByIdAndUpdate(id, newProduct);
		fs.unlink(product.image, (err) => {
			if (err) {
				return next(createError(500));
			}
		});
		res.json();
	} catch (error) {
		next(createError(500, error.message));
	}
};

const getOne = async (req, res, next) => {
	try {
		const { productId } = req.body;
		const product = await Product.findByIdAndRemove(productId);
		if (!product) {
			return next(createError(404));
		}
		res.json({ product });
	} catch (error) {
		if (error.name === 'CastError') {
			return next(createError(404));
		}
		next(createError(500, error.message));
	}
};

const getAll = async (req, res, next) => {
	try {
		const products = await Product.find();
		res.json({ products });
	} catch (error) {
		next(createError(500, error.message));
	}
};

const deleteProduct = async (req, res, next) => {
	try {
		const product = await Product.findById(req.body.id);
		if (!product) {
			return next(createError(404));
		}
		await product.remove();
		fs.unlink(product.image, (err) => {
			if (err) {
				return next(createError(500));
			}
		});
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
	update,
	getOne,
	getAll,
	deleteProduct,
};
