var express = require('express');
var router = express.Router();

/* GET apps listing. */
router.get('/', function(req, res, next) {
	res.sendFile('apps.html');
});

module.exports = router;
