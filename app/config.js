var fs = require('fs');

module.exports = {
	key:    fs.readFileSync('/root/spacehexagon/private-key.key'),
	cert:   fs.readFileSync('/root/spacehexagon/certificate.crt'),
	//cert: fs.readFileSync('/etc/ssl/certs/cert-spacehexagon-bundle.crt')
   ca:     fs.readFileSync('/root/spacehexagon/intermediate-certificate.crt')
};
