var BaseCtrl = require('./base');
var _ = require('lodash');
var Promise = require('bluebird');
var util = require('util');
var AccountModel = require("../model/mongo/AccountModel");
var generatePassword = require('generate-password');
var crypto = require('crypto');

function UserCtrl(_params) {
    _params = _params || {};
    BaseCtrl.call(this, _params);
    this.accountModel =  new AccountModel();
}
util.inherits(UserCtrl, BaseCtrl);

UserCtrl.prototype.login = function (params, tracer) {
    var self = this;
    return self.accountModel.create(params);
}

UserCtrl.prototype.create = function (params, tracer) {
    var self = this;
    var accountModel = new AccountModel();
    var user = _.pick(params, [   
        "username",
        "phoneNumber"
    ]);
    var password = generatePassword.generate({
        length: 10,
        uppercase: false,
        strict: true,
        numbers: true
    });
    user.password = crypto.createHash('md5').update(password).digest('hex');
    return accountModel.save(user);
}

module.exports = UserCtrl;