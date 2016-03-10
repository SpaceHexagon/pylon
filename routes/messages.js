var express = require('express');
var router = express.Router();

/* GET messages listing. */
router.get('/', function(req, res, next) {
	res.sendFile('messages.html');
});

module.exports = router;
