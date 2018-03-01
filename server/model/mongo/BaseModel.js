var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var util = require('util');

function BaseModel(_params) {
    var self = this;
    if (_.isPlainObject(_params)) {
        for (var i in _params) {
            self[i] = _params[i];
        }
    }
}
util.inherits(BaseModel, EventEmitter);

module.exports = BaseModel;