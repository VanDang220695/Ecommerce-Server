const express = require('express');

const {
	create,
	getOne,
	update,
	deleteCategory,
	getAll,
} = require('../controllers/category');
const { handlerValidationResult } = require('../helpers/utils');
const {
	validationCategory,
	validationCategoryId,
	validationUpdateCategory,
} = require('../helpers/validation/category');

const { checkRoleAdmin, checkAuth } = require('../middleware/checkPermission');

const router = express.Router();

router.post(
	'/create',
	checkAuth,
	checkRoleAdmin,
	handlerValidationResult(validationCategory),
	create,
);

router.post(
	'/update',
	checkAuth,
	checkRoleAdmin,
	handlerValidationResult(validationUpdateCategory),
	update,
);

router.post('/getOne', handlerValidationResult(validationCategoryId), getOne);
router.post('/getAll', getAll);

router.post(
	'/delete',
	checkAuth,
	checkRoleAdmin,
	handlerValidationResult(validationCategoryId),
	deleteCategory,
);

module.exports = router;
