var Promise = require('bluebird');
var _ = require('lodash');
var util = require('util');
var Account = require("./schema/Account.js");
var BaseModel = require('./BaseModel');
var logger = require('./../../controller/logger');

var api_key = 'key-XXXXXXXXXXXXXXXXXXXXXXX';
var domain = 'www.mydomain.com';
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

function AccountModel(_params) {
    BaseModel.call(this, _params);
}
util.inherits(AccountModel, BaseModel);

AccountModel.prototype.find = function (_params) {
    return Promise.all([
        Account.find({})
        .sort(_params.sort || {username: 1})
        .limit(_params.limit || 10)
        .skip(_params.skip || 0)
        .select("username phoneNUmber"),
        Account.count()
    ])
        .spread(function (list, total) {
            logger.log("DEBUG", "AccountModel.find", "return data of find()", list, null, null);
            return {list, total};
            
        })
        .catch(function (error) {
            logger.log("ERROR", "AccountModel.find", "error", null, error, null);
            return error;
        })
}

AccountModel.prototype.save = function(_params) {
    var account = new Account(_params);
    return account.save();
}

AccountModel.prototype.login = function(_params) {
    return Account.findOne({ username: _params.username })
    .then(function(foundAccountByUsername) {
        if (!foundAccountByUsername) {
            return {
                status: 404,
                message: "User not found",
                errorCode: "USER_NOT_FOUND"
            }
        }
        // if (foundAccountByUsername.password != _params.password) {
        //     return {
        //         status: 400,
        //         message: "Invalid username or password",
        //         errorCode: "PASSWORD_IS_WRONG"
        //     }
        // }
        logger.log("DEBUG", "AccountModel.create", "return data of findOne()", foundAccountByUsername, null, null);
        return {
            status: 200,
            user: foundAccountByUsername
        }
    })
        .catch(function (error) {
            logger.log("ERROR", "AccountModel.find", "error", null, error, null);
        return error;
    });
}

AccountModel.prototype.update = function(_params) {
    return Promise.all([
        Account.findOne({
            _id: _params._id
        }),
        Account.findOne({
            username: _params.username,
            _id: { $ne: _params._id}
        })
    ])
    .spread(function(foundAccountById, foundAccountByUsername) {
        if (!foundAccountById) {
            return {
                status: 404,
                message: "Username not found",
                errorCode: "USERNAME_NOT_FOUND"
            }
        }
        if (foundAccountByUsername) {
            return {
                status: 400,
                message: 'Username existed',
                errorCode: 'USERNAME_EXISTED'
            }
        }
        logger.log("DEBUG", "AccountModel.update", "return data of findOne()", foundAccountById, null, null);
        foundAccountById.set("username", _params.username);
        foundAccountById.set("phoneNumber", _params.phoneNumber);
        return foundAccountById.save();
    })
    .catch(function(error) {
        logger.log("ERROR", "AccountModel.update", "error", null, error, null);
        return error;
    });
}

AccountModel.prototype.delete = function (_params) {
    return AccountModel.findOne({ _id: _params._id })
    .then(function (foundAccountById) {
        if (!foundAccountById) {
            return {
                status: 404,
                message: "User not found",
                errorCode: "USER_NOT_FOUND"
            }
        }
        logger.log("DEBUG", "AccountModel.delete", "remove data one account", foundAccountById, null, null);
        return foundAccountById.remove();
    })
        .catch(function (error) {
            logger.log("ERROR", "AccountModel.delete", "error", null, error, null);
        return error;
    })
}

AccountModel.prototype.resetPassword = function (_params) {
    return AccountModel.findOne({ _id: _params._id })
    .then(function (foundAccountById) {
        if (!foundAccountById) {
            return {
                status: 404,
                message: "User not found",
                errorCode: "USER_NOT_FOUND"
            }
        }
        return foundAccountById;
    })
    .then(function (user) {
        var data = {
            from: 'Excited User <me@samples.mailgun.org>',
            to: [user.email],
            subject: 'Testing mailgun to send a new reset password',
            text: user.password
        };

        mailgun.messages().send(data, function (error, body) {
            console.log(body);

        });
    })
}

AccountModel.prototype.changePassword = function(_params) {
    return AccountModel.findOne({ _id: _params._id })
    .then(function(foundAccountById) {
        if(!foundAccountById) {
            return {
                status: 404,
                message: "User not found",
                errorCode: "USER_NOT_FOUND"
            }
        }
        if (foundAccountById._id != _params._id) {
            return {
                status: 400,
                message: "Password is incorrect",
                errorCode: "WRONG_PASSWORD"
            }
        }
        if (_params.newPassword != _params.retypePassword) {
            return {
                status: 400,
                message: "Password is incorrect",
                errorCode: "WRONG_PASSWORD"
            }
        }

        foundAccountById.set("password", _params.newPassword);
        foundAccountById.save();
    }) 
}

module.exports = AccountModel; 



