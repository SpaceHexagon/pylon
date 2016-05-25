var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    APPLET_CREATE: null,
		APPLET_DESTROY: null,
		DOCUMENT_CREATE: null,
		DOCUMENT_UPDATE: null,
		DOCUMENT_DESTROY: null,
		MESSAGE_CREATE: null,
		MESSAGE_DESTROY: null
  })

};
