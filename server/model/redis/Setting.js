var util = require('util');
var async = require('async');
var Promise = require('bluebird');
var EventEmitter = require('events').EventEmitter;
var RedisArticle = require('../../config/redis').redisArticle;
var logger = require("../../controller/logger");
var _ = require('lodash');
function SettingModel(_params) {
    var self = this;
    if (_.isPlainObject(_params)) {
        for (var i in _params) {
            self[i] = _params[i];
        }
    }
}
util.inherits(SettingModel, EventEmitter);

SettingModel.prototype.createNotification = function (params, tracer) {
    return new Promise(function(resolve, reject) {
        var data = [];
        data = data.push(JSON.stringify(params));
        RedisArticle.LPUSH("notifications"+params.userId, data, function(error, list){
            if (!error) {
                console.log(list)
                logger.log("DEBUG","SettingModel.createNotification", 'return list', list, null, tracer)
                resolve(list);
            } else {
                logger.log('ERROR', "SettingModel.createNotification", 'error', null, error, tracer);
                reject(error);
            }
        })
    })
}

SettingModel.prototype.getAllNotification = function (params, tracer) {
    return new Promise(function(resolve, reject) {
        RedisArticle.LRANGE("notifications"+params.userId, 0, -1, function(error, list){
            if (!error) {
                console.log(list)
                var rs;
                try {
                    rs = _.map(list, function (item) {
                        return JSON.parse(item);
                    });
                    logger.log("DEBUG", "SettingModel.createNotification", 'return list', list, null, tracer)
                } catch (error) {
                    reject(error);
                    logger.log("ERROR", "SettingModel.createNotification", 'error in parse json', null, error, tracer)
                }
                resolve(rs);
            } else {
                logger.log('ERROR', "SettingModel.createNotification", 'error', null, error, tracer);
                reject(error);
            }
        })
    })
}

SettingModel.prototype.updateNotification = function (params, tracer) {
    var index = 1, id="";
    return new Promise(function (resolve, reject) {
        RedisArticle.LINDEX("notifications"+params.userId, index, function (error, item) {
            if(!error) {
                console.log(item)
                var elem = JSON.parse(item);
                try{
                    if (id == elem._id) {
                        RedisArticle.LSET("notifications"+params.userId, index, JSON.stringify(elem), function (error, item) {
                            if (!error) {
                                logger.log('DEBUG', "SettingModel.updateNotification", 'return set data', item, null, tracer);
                                resolve(item);
                            } else {
                                logger.log('ERROR', "SettingModel.updateNotification", 'error', null, error, tracer);
                                reject(error);
                            }
                        });
                    }
                } catch (error) {
                    logger.log('ERROR', "SettingModel.updateNotification", 'error', null, error, tracer);
                    reject(error);
                }
            } else {
                logger.log('ERROR', "SettingModel.updateNotification", 'error', null, error, tracer);
                reject(error);
            }
        })
    })
}

SettingModel.prototype.deleteNotification = function (params, tracer) {
    return new Promise.resolve(function(resolve, reject) {
        RedisArticle.LINDEX("notifications"+params.userId, params.index, function(error, item) {
            if (!error) {
                var elem = JSON.parse(item);
                try {
                    if (elem && elem._id == params._id) {
                        RedisArticle.DEL("notifications"+params.userId, params.index, JSON.stringify(elem), function(error, response){
                            if (!error) {
                                logger.log("DEBUG", "SettingModel.deleteNotification", 'remove elem from list', error, null, tracer);
                                resolve(error);
                            } else {
                                logger.log("ERROR", "SettingModel.deleteNotification", 'error', null, error, tracer);
                                reject(error);
                            }
                        });
                    }
                    
                } catch (error) {
                    logger.log("ERROR", "SettingModel.deleteNotification", 'error', null, error, tracer);
                    reject(error);
                }
            } else {
                logger.log("ERROR", "SettingModel.deleteNotification", 'error', null, error, tracer);
                reject(error);
            }
        })
    });
}

module.exports = SettingModel;