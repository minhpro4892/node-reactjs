module.exports = (io) => {
    console.log('IO: ');
    io.on('connection', function (socket) {
        console.log('socket connected:' + socket);
        socket.emit("announcements", {message: "new user joined web"});
        socket.on("greeting", function(data) {
            console.log(data.message);
        });
    });

    io.on('disconnect', function(socket) {
        console.log('socket disconnected:' + socket);
    });

    io.on('reconnect_attempt', function(socket) {
        console.log('reconnect attempted:' + socket);
    });
}