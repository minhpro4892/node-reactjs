var permissionConfig = require('./config');
var logger = require('./../../controller/logger');
var errorCode = require('./../../config/errorCode');
var Account = require('./../../model/mongo/AccountModel');
var _ = require('lodash');

module.exports = function(req, res, next) {
    var permission = permissionConfig[req.route.path] || permissionConfig[req.url];
    if (!permission) return next();
    var user = _.get(req, "session.user", null);
    if (user) {
        Account.findOne({ _id: user._id})
        .then(function(foundAccountById) {
            if (!foundAccountById) {
                logger.log("Error", "Permission", "Account not found", null, "Denied", req.requestId)
                res.send({
                    status: 404,
                    message: 'Account not found',
                    errorCode: 400003
                });
            } else {
                next();
            }
        })
    } else {
        logger.log("Error", "Permission", "Session not found", null, "Denied", req.requestId)
        res.send({
            status: 404,
            message: 'Session not found',
            errorCode: 400003
        });
    }
}