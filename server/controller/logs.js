var util = require('util');
var Promise = require('bluebird');
var _ = require('lodash');
var Constants = require('../config/constants');
var ErrorCode = require('./../config/errorCode');
var LogsModel = require('../model/mongo/LogsModel');
var logger = require('./logger');
var inboxHelper = require('./libs/inbox.helper');
var BaseCtrl = require('./base');

function LogsCtrl(_params) {
  BaseCtrl.call(this, _params);
  this.logsModel = new LogsModel();
}
util.inherits(LogsCtrl, BaseCtrl);

LogsCtrl.prototype.create = function (params, tracer) {
  var self = this;
  if (!self.user) { return Promise.resolve() };
  return self.logsModel.create({
    "userId": self.user._id,
    "fullName": `${self.user.firstName || ""} ${self.user.lastName || ""}`,
    "userName": self.user.userName,
    "fleetId": params.fleetId || _.get(self, "user.fleetId[0]", ""),
    "module": params.module,
    "action": params.action,
    "description": params.description
  }, tracer);
};

module.exports = LogsCtrl;