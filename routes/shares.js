var express = require('express');
var router = express.Router();

/* GET shares listing. */
router.get('/', function(req, res, next) {
	res.sendFile('shares.html');
});

module.exports = router;
