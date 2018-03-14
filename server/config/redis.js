var redis = require("redis");
var config = require('config');
var redisConfig = {
    "server": "127.0.0.1",
    "port": 6379,
    "username": "",
    "password": ""
}
var port = config.port;
var server = config.server;
var pw = config.password;

var redisClient = redis.createClient(port, server);

var redisSetting = redis.createClient(port, server);
redisSetting.select(3);
if (pw) {
    redisSetting.auth(pw);
}
redisSetting.on('error', function (err) {
    console.log(new Date().toISOString() + ' redisSetting connection error to - ' + err);
    process.exit(1);
});
redisSetting.on('ready', function (err) {
    console.log(new Date().toISOString() + ' redisSetting connection success - ' + err);
});
var redisBooking = redis.createClient(port, server);
redisBooking.select(8);
if (pw) {
    redisBooking.auth(pw);
}
redisBooking.on('error', function (err) {
    console.log(new Date().toISOString() + ' redisBooking connection error to - ' + err);
    process.exit(1);
});
redisBooking.on('ready', function (err) {
    console.log(new Date().toISOString() + ' redisBooking connection success - ' + err);
});
module.exports = {
    redisClient: redisClient,
    redisSetting: redisSetting,
    redisBooking: redisBooking
};