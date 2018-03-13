var _ = require('lodash');
var util = require('util');
var logger = require("../../controller/logger");
var Promise = require('bluebird');
var BaseModel = require('./BaseModel');

function LogsModel(_params) {
    BaseModel.call(this, _params);
}
util.inherits(LogsModel, BaseModel);

module.exports = LogsModel;