var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('socket connected:' + socket);
});

module.exports = {
    io: io
}