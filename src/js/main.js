console.log('loading modules...');

FileView = require("../ui/file-view.js");

window.socket = io.connect("https://vpylon.net:8085", {secure:true, port: 8085});
