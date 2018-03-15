module.exports = (io) => {
    console.log('IO: ', io);
    io.on('connection', function (socket) {
        console.log('socket connected:' + socket);
    });

    io.on('disconnect', function(socket) {
        console.log('socket disconnected:' + socket);
    });

    io.on('reconnect_attempt', function(socket) {
        console.log('reconnect attempted:' + socket);
    });
}