const express = require('express');

const { handlerValidationResult } = require('../helpers/utils');

const {
	validationUpdateProduct,
	validationProductId,
	validationProduct,
} = require('../helpers/validation/product');

const fileUpload = require('../middleware/fileUpload');
const { checkRoleAdmin, checkAuth } = require('../middleware/checkPermission');

const {
	create,
	update,
	getOne,
	getAll,
	deleteProduct,
} = require('../controllers/product');

const router = express.Router();

router.post(
	'/create',
	fileUpload('product').single('image'),
	checkAuth,
	checkRoleAdmin,
	handlerValidationResult(validationProduct),
	create,
);

router.post('/getOne', handlerValidationResult(validationProductId), getOne);
router.post('/getAll', getAll);
router.post(
	'/delete',
	checkAuth,
	checkRoleAdmin,
	handlerValidationResult(validationProductId),
	deleteProduct,
);

router.post(
	'/update',
	fileUpload('product').single('image'),
	checkAuth,
	checkRoleAdmin,
	handlerValidationResult(validationUpdateProduct),
	update,
);

module.exports = router;
