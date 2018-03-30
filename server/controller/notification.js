var BaseCtrl = require('./base');
var _ = require('lodash');
var Promise = require('bluebird');
var util = require('util');
var Setting = require("../model/redis/Setting");

function NotificationCtrl(params) {
    params = params || {};
    BaseCtrl.call(this, params);
    this.setting = new Setting();
}
util.inherits(NotificationCtrl, BaseCtrl);

NotificationCtrl.prototype.create = function (params, tracer) {
    var self = this;
    return self.setting.createNotification(params, tracer);   
}

NotificationCtrl.prototype.getAll = function (params, tracer) {
    var self = this;
    return self.setting.getAllNotification(params, tracer);
}

NotificationCtrl.prototype.update = function (params, tracer) {
    var self = this;
    return self.setting.updateNotification(params, tracer);
}


module.exports = NotificationCtrl;