console.log('loading modules...');

FileView = require("../ui/file-view.js");

window.socket = io.connect("http://datahexagon.com:8084", {secure:false, port: 8084});
