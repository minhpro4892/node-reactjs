import io from 'socket.io-client';
import { socketConfig } from './../constants/socketConfigs';
var socket = null;

export function socketAuth(userId, connectedCallback, disconnectCallback, reconnect_attempt) {
    if (!socket) {
        socket = io(socketConfig.socketServer);
        socket.on("connect", function(socket) {
            console.log('socket client connected:' + socket);
        });
    
        socket.on("disconnect", function(socket) {
            console.log('socket client disconnected:' + socket);
        });
    
        socket.on("reconnect_attempt", function(socket) {
            console.log("socket reconnect_attempt: " + socket);
        });
    }
}