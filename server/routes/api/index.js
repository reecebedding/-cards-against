const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
	res.json({
		'key': 'value'
	});
});

module.exports = router;