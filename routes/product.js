const express = require('express');

const { handlerValidationResult, validationProduct } = require('../validator');

const { create } = require('../controllers/product');

const router = express.Router();

router.post('/create', handlerValidationResult(validationProduct), create);

module.exports = router;
