var UUID = require('uuid');
var logger = require('./../controller/logger');

module.exports = function (req, res, next) {
    var requestIdFromClient = req.headers["x-request-id"];
    logger.log("info", "Tracer middleware", "requestIdFromClient: ", requestIdFromClient);
    req.requestId = requestIdFromClient || UUID.v4();
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    logger.log("info", "Tracer middleware", "Request from ip: ", ip, null, req.requestId);
    next();
};