var socketConfigs = require('./socketConfig');

module.exports = (io) => {
    io.on('connection', function (socket) {
        console.log('socket connected:' + socket);
        socket.on(socketConfigs.receive.login, function (data) {
            console.log('debug get login event');
            socket.emit(socketConfigs.send.login, data);
        });
        socket.on(socketConfigs.receive.addArticle, function(data) {
            console.log('debug get addArticle event');
            socket.emit(socketConfigs.send.addArticle, {message: "Add new article successfully"})
        });
        socket.on(socketConfigs.receive.updateArticle, function (data) {
            console.log('debug get updateArticle event');
            socket.emit(socketConfigs.send.updateArticle, { message: "Update article successfully" })
        });
        socket.on(socketConfigs.receive.deleteArticle, function (data) {
            console.log('debug get deleteArticle event');
            socket.emit(socketConfigs.send.deleteArticle, { message: "Delete article successfully" })
        });
    });

    io.on('disconnect', function(socket) {
        console.log('socket disconnected:' + socket);
    });

    io.on('reconnect_attempt', function(socket) {
        console.log('reconnect attempted:' + socket);
    });
}