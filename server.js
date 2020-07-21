const http = require("http");
const nStatic = require('node-static');
const faceapi = require('face-api.js')
let fileServer = new nStatic.Server('./public');

http.createServer(function(request, response) {
    fileServer.serve(request, response);
}).listen(5858);