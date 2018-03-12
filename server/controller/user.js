var BaseCtrl = require('./base');
var _ = require('lodash');
var Promise = require('bluebird');
var util = require('util');
var AccountModel = require("../model/mongo/AccountModel");
var generatePassword = require('generate-password');
var crypto = require('crypto');

var api_key = 'key-XXXXXXXXXXXXXXXXXXXXXXX';
var domain = 'www.mydomain.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

function UserCtrl(_params) {
    _params = _params || {};
    BaseCtrl.call(this, _params);
    this.accountModel =  new AccountModel();
}
util.inherits(UserCtrl, BaseCtrl);

UserCtrl.prototype.find = function (params, tracer) {
    var self = this;
    return  self.accountModel.find(params);   
}

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

UserCtrl.prototype.update = function(params, tracer) {
    var seft = this;
    var user = _.pick(params, [
        "_id",
        "username",
        "phoneNumber"
    ]);
    return seft.accountModel.update(user);
}

UserCtrl.prototype.delete = function (params, tracer) {
    var seft = this;
    return seft.accountModel.delete(user);
}

UserCtrl.prototype.resetPassword = function(params, tracer) {
    var seft = this;
    var password = generatePassword.generate({
        length: 10,
        uppercase: false,
        strict: true,
        numbers: true
    });
    var data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: 'serobnic@mail.ru',
        subject: 'Testing mailgun to send a new reset password',
        text: password
      };
      
      mailgun.messages().send(data, function (error, body) {
        console.log(body);

      });
}

UserCtrl.prototype.changePassword = function(params, tracer) {
    var seft = this;
    var user = {};
    user.oldPassword = crypto.createHash("md5").digest(params.oldPassword).digest();
    user.newPassword = crypto.createHash("md5").digest(params.newPassword).digest();
    user.retypePassword = crypto.createHash("md5").digest(params.retypePassword).digest();
    user._id = params._id;
    return self.accountModel.changePassword(user);
}

module.exports = UserCtrl;