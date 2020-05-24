const express = require('express');

const { create } = require('../controllers/category');

const { handlerValidationResult } = require('../helpers/utils');

const { validationCategory } = require('../helpers/validation/category');

const { checkRoleAdmin, checkAuth } = require('../middleware/checkPermission');

const router = express.Router();

router.post(
	'/create',
	checkAuth,
	checkRoleAdmin,
	handlerValidationResult(validationCategory),
	create,
);

module.exports = router;
