'use strict';
var winston = require("winston");
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');
var argv = require('minimist')(process.argv.slice(2));
var logger = exports;
var config = require('config');
logger.dispatch = function (level, bookId, data, tracer) {

}
logger.log = function (level, moduleName, des, data, error, tracer) {
    var message;
    try {
        if (arguments.length <= 2)
            message = moduleName;
        else {
            data = data != null ? data : undefined;
            if (error && error.toString() == "[object Object]") { }
            else error = error != null ? error.toString() : undefined;
            tracer = tracer != null ? tracer : undefined;
            message = {
                module: moduleName,
                des: des,
                data: data,
                error: error,
                tracer: tracer
            }
        }
        if (level == "BUG" || level == "URGENT" || error != null) {
            wLogger.error(JSON.stringify(message));
        } else if (level == "INFO" || level == "DEBUG") {
            wLogger.log(level.toLowerCase(), JSON.stringify(message));
        } else wLogger.debug(level + ': ' + JSON.stringify(message))
    } catch (error) {
        wLogger.error('URGENT: {"module": "logger", "des": "error in log function", "error": "' + error + '"}');
    }
}
// var logConfig = config.get('logger');
var logConfig = {
    "debug": {
      "name": "debug-file",
      "level": "debug",
      "datePattern": "yyyy-MM-dd",
      "prepend": true,
      "filename": "/LAPTRINH/logs/.debug.log",
      "maxsize": 2.5e+7,
      "json": false,
      "timestamp": true,
      "handleExceptions": true,
      "zippedArchive": true,
      "maxDays": 30
    },
    "console": false
  }
var transports = [
    new (winston.transports.DailyRotateFile)(logConfig.debug)
];

if (logConfig.error) {
    transports.push(new (winston.transports.DailyRotateFile)(logConfig.error))
}

if (logConfig.console) {
    transports.push(new (winston.transports.Console)({
        name: 'info-console',
        level: 'debug',
        json: false,
        timestamp: true,
        handleExceptions: true,
        colorize: true,
        label: argv.p || 8000,
        zippedArchive: true
    }))
}

var wLogger = new (winston.Logger)({
    transports,
    exitOnError: false
});