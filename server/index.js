var restify = require('restify');
var jwt_redis = require("./middleware/jwt-redis-session");
var joi = require("./middleware/validation/joi");
var permission = require("./middleware/permission");
var tracer = require("./middleware/tracer")
var redisClient = require('./config/redis').redisClient;
var constants = require('./config/constants');
process.env.NODE_CONFIG_DIR = './server'
var config = require('config');
console.log('NODE_CONFIG_DIR: ' + config.util.getEnv('NODE_CONFIG_DIR '));
var mongoose = require('mongoose');
var server = restify.createServer();
var io = require('socket.io')(server);
var corsMiddleware = require('restify-cors-middleware');
require('./config/mongo').configMongoDb(mongoose);
server.server.setTimeout(60000 * 60 * 1);
var fs = require('fs');
var logger = require('./controller/logger');
server.use(tracer);
server.use(function(req, res, next){
    logger.log("INFO", "Request: ", req.url, null, null, req.requestId);
    next()
})
server.post('/session', function (req, res) {
    console.log("Request JWT session data: ",
        req.session.id,
        req.session.claims,
        req.session.jwt
    );
    res.json(req.session.toJSON());
});
/**
 * require all model
 *
 */
fs.readdirSync(__dirname + '/model/mongo/schema').forEach(function (file) {
    if (~file.indexOf('.js')) {
        //console.log(file);
        require(__dirname + '/model/mongo/schema' + '/' + file);
    }
});
var cors = corsMiddleware({
    preflightMaxAge: 5, //Optional 
    origins: ['*'],
    allowHeaders: ['Authorization', 'Content-Type', 'x-request-id'],
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.bodyParser({
    uploadDir: "./uploads"
}));
server.use(restify.plugins.queryParser());

server.use(jwt_redis({
    client: redisClient,
    keyspace: constants['REDIS_KEY'].CC_SESSION_KEY,
    secret: constants['SECURE']
}));
server.use(joi);
!process.env.SKIP_PERMISSION && server.use(permission);

require('./router')(server);
require('./config/socket')(io);
server.listen(process.argv[2] || process.env.CCLITE_PORT || 9000, "0.0.0.0", function () {
    console.log('%s listening at %s', server.name, server.url);
});