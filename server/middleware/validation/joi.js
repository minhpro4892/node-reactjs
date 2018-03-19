var Joi = require('joi');
var schemas = require('./');
var util = require('util');
var _ = require('lodash');
var ErrorCode = require('./../../config/errorCode');
var logger = require('./../../controller/logger');
var env = process.env.NODE_ENV;

module.exports = function (req, res, next) {
    var data = Object.assign({}, req.body || {}, req.query, req.params);
    if (req.route.path != '/api/vehiclemodel/create'
        && req.route.path != '/api/vehiclemake/create') {
        logger.log("DEBUG", "Validation", "Request params", JSON.stringify(data), null, req.requestId);
    } else {
        logger.log("DEBUG", "Validation", "Request params", JSON.stringify(_.omit(data, ['image', 'models'])));
    }

    if (schemas[req.route.path]) {
        Joi.validate(data, schemas[req.route.path], {
            convert: true,
            stripUnknown: true
        }, function (err, convertedData) {
            if (!err) {
                if (req.body) {
                    req.body = convertedData;
                }
                next();
            } else {
                logger.log("ERROR", "Validation", req.route.path, null, err, req.requestId);
                var error = {
                    status: 400,
                    errorCode: ErrorCode.VALIDATION_ERROR,
                    message: "Validation error."
                };
                (env == 'dev' || env == 'lab-dev') && (error.devMessage = err.toString());
                res.send(400, error);
            }
        });
    } else {
        next()
    }
};