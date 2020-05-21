const formidable = require('formidable');
const fs = require('fs');

const _lodash = require('lodash');

const Product = require('../models/product');

const create = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Image could not be uploaded' });
    }
    const product = new Product(fields);

    // check for all fields

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({ error: 'Image should be less than 1mb size' });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      }
      res.status(201).json(result);
    });
  });
};

module.exports = {
  create,
};
