const express = require('express');

const { signup, login } = require('../controllers/auth');
const {
	handlerValidationResult,
	validationUserLogin,
	validationUserSignup,
} = require('../helpers/validator');

const router = express.Router();

router.post('/signup', handlerValidationResult(validationUserSignup), signup);
router.post('/login', handlerValidationResult(validationUserLogin), login);

module.exports = router;
