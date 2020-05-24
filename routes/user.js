const express = require('express');

const router = express.Router();

router.get('/secret/:userId', (req, res) => {
	res.json({
		user: req.profile,
	});
});

module.exports = router;
