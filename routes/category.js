const express = require('express');

const { create } = require('../controllers/category');

const {
	handlerValidationResult,
	validationCategory,
} = require('../helpers/validator');

const checkAuth = require('../middleware/checkAuth');
const { checkRoleAdmin } = require('../middleware/checkPermission');

const router = express.Router();

router.post(
	'/create',
	checkAuth,
	checkRoleAdmin,
	handlerValidationResult(validationCategory),
	create,
);

module.exports = router;
