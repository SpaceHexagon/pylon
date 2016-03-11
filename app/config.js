var fs = require('fs');

module.exports = {
	secret: "",
	test: "",
	key:    fs.readFileSync('private-key.key'),
	cert:   fs.readFileSync('certificate.crt'),
   	ca:     fs.readFileSync('intermediate-certificate.crt')
};
