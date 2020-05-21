const express = require('express');

const { create } = require('../controllers/category');

const checkAuth = require('../middleware/checkAuth');
const { checkRoleAdmin } = require('../middleware/checkPermission');

const router = express.Router();

router.post('/create', checkAuth, checkRoleAdmin, create);

module.exports = router;
