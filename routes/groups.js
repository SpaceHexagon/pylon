var express = require('express');
var router = express.Router();

/* GET groups listing. */
router.get('/', function(req, res, next) {
	res.sendFile('groups.html');
});

module.exports = router;
