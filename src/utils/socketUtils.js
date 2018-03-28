import io from 'socket.io-client';
import { socketConfig } from './../constants/socketConfigs';
import {loadUserProfile} from "./apiUtils";
var socket = null;

export const socketApi = {
    socketLogin: function() {
        if (!socket) {
            socket = io(socketConfig.socketServer);
            socket.on("connect", ()=>{
                socket.emit(socketConfig.send.login, {
                    username: "", token: ""
                });
            })
        }
    },
    on: function(event, callback) {
        if (socket) {
            socket.on(event, function(data) {
                callback(data);
            });
        }
    },
    emit: function(event, data, callback) {
        if (socket) {
            socket.emit(event, data, function(data) {
                callback(data);
            });
        }
    },
    remove: function(event) {
        if (socket) {
            socket.removeListener(event);
        }
    },
    close: function(event) {
        if (socket) {
            socket.disconnect();
        }
    },
    socket: socket || io(socketConfig.socketServer)
}
export function socketAuth(username, connectedCallback, disconnectCallback, reconnect_attempt) {
    if (!socket) {
        socket = io(socketConfig.socketServer);
        socket.on("connect", function(socket) {
            // console.log('socket client connected:' + socket);
            // socket.on("announcements", function(data) {
            //     console.log(data.message);
            // });
            // socket.emit("greeting", {message: "Hi all people"});
            socket.emit(socketConfig.send.login, { username: username, token: user.token });
        });
        
        socket.on(socketConfig.send.login, function(payload){
            connectedCallback(payload);
        })
        socket.on("disconnect", function(socket) {
            console.log('socket client disconnected:' + socket);
            disconnectCallback();
        });
    
        socket.on("reconnect_attempt", function(socket) {
            console.log("socket reconnect_attempt: " + socket);
            reconnect_attempt();
        });
    }
}