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
                logger.log("DEBUG","SettingModel.createNotification", 'return list', list, null, tracer)
                resolve(list);
            } else {
                logger.log('ERROR', "SettingModel.createNotification", 'error', null, error, tracer);
                reject(error);
            }
        })
    })
}

SettingModel.prototype.updateNotification = function (params, tracer) {

}

SettingModel.prototype.deleteNotification = function (params, tracer) {

}

module.exports = SettingModel;