const express = require('express');

const {
	handlerValidationResult,
	validationUpdateProduct,
	validationProductId,
	validationProduct,
} = require('../helpers/validator');

const fileUpload = require('../middleware/fileUpload');
const checkAuth = require('../middleware/checkAuth');
const { checkRoleAdmin } = require('../middleware/checkPermission');

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
