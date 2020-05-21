const createError = require('http-errors');

const Category = require('../models/category');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

module.exports = {
  create,
};
