var util = require('util');
var async = require('async');
var Promise = require('bluebird');
var EventEmitter = require('events').EventEmitter;
var RedisSetting = require('../../config/redis').redisSetting;
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
        RedisArticle.LPUSH("notification"+params.userId, {title: params.title, content: params.content, author: params.userId}, function(error, data){
            if (!error) {
                console.log(data)
                logger("DEBUG","SettingModel.createNotification", 'return data', data, null, tracer)
                resolve(data);
            } else {
                logger('ERROR', "SettingModel.createNotification", 'error', null, error, tracer);
                reject(error);
            }
        })
    })
}

SettingModel.prototype.getAllNotification = function (params, tracer) {
    return new Promise(function(resolve, reject) {
        RedisArticle.LRANGE("notification"+params.userId, 0, -1, function(error, data){
            if (!error) {
                console.log(data)
                logger("DEBUG","SettingModel.createNotification", 'return data', data, null, tracer)
                resolve(data);
            } else {
                logger('ERROR', "SettingModel.createNotification", 'error', null, error, tracer);
                reject(error);
            }
        })
    })
}

SettingModel.prototype.updateNotification = function (params, tracer) {

}

SettingModel.prototype.deleteNotification = function (params, tracer) {

}