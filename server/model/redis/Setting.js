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
    
}

SettingModel.prototype.updateNotification = function (params, tracer) {

}

SettingModel.prototype.deleteNotification = function (params, tracer) {

}