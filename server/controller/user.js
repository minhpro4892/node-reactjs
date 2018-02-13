var BaseCtrl = require('./base');
var _ = require('lodash');
var Promise = require('bluebird');
var util = require('util');

function UserCtrl(_params) {
    _params = _params || {};
    BaseCtrl.call(this, _params);
}
util.inherits(UserCtrl, BaseCtrl);

UserCtrl.prototype.login = function (params, tracer) {
    var self = this;
    return new Promise((resolve, reject) => {
        return resolve({
            user: {
                username: 'minh_pro4892'
            },
            token: '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
        })
    })
    
}

module.exports = UserCtrl;