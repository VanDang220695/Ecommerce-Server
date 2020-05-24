const express = require('express');

const { signup, login } = require('../controllers/auth');
const { handlerValidationResult } = require('../helpers/utils');
const {
	validationUserLogin,
	validationUserSignup,
} = require('../helpers/validation/auth');

const router = express.Router();

router.post('/signup', handlerValidationResult(validationUserSignup), signup);
router.post('/login', handlerValidationResult(validationUserLogin), login);

module.exports = router;
