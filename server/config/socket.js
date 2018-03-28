module.exports = (io) => {
    console.log('IO: ');
    io.on('connection', function (socket) {
        console.log('socket connected:' + socket);
        socket.on("addArticle", function(data) {
            socket.emit("addArticle", {message: "Add new article"})
        });
    });

    io.on('disconnect', function(socket) {
        console.log('socket disconnected:' + socket);
    });

    io.on('reconnect_attempt', function(socket) {
        console.log('reconnect attempted:' + socket);
    });
}