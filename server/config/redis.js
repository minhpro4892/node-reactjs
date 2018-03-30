var redis = require("redis");
var config = require('config');
var redisConfig = {
    "server": "127.0.0.1",
    "port": 6379,
    "username": "",
    "password": ""
}
var port = redisConfig.port;
var server = redisConfig.server;
var pw = redisConfig.password;

var redisClient = redis.createClient(port, server);

var redisArticle = redis.createClient(port, server);
redisArticle.select(8);
if (pw) {
    redisArticle.auth(pw);
}
redisArticle.on('error', function (err) {
    console.log(new Date().toISOString() + ' redisArticle connection error to - ' + err);
    process.exit(1);
});
redisArticle.on('ready', function (err) {
    console.log(new Date().toISOString() + ' redisArticle connection success - ' + err);
});

module.exports = {
    redisClient: redisClient,
    redisArticle: redisArticle
};