var Promise = require('bluebird');
var _ = require('lodash');
var util = require('util');
var Account = require("./schema/Account.js");
var BaseModel = require('./BaseModel');
var logger = require('./../../controller/logger');

function AccountModel(_params) {
    BaseModel.call(this, _params);
}
util.inherits(AccountModel, BaseModel);

AccountModel.prototype.save = function(_params) {
    var account = new Account(_params);
    return account.save();
}

AccountModel.prototype.create = function(_params) {
    return Account.findOne({ username: _params.username }).select('username phoneNumber')
    .then(function(foundAccountByUsername) {
        if (!foundAccountByUsername) {
            return {
                status: 404,
                message: "User not found"
            }
        }
        logger.log("DEBUG", "AccountModel.create", "return data of findOne()", foundAccountByUsername, null, null);
        return {
            status: 200,
            user: foundAccountByUsername,
            token: '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
        }
    })
    .catch(function(error) {
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
        foundAccountById.set("username", _params.username);
        foundAccountById.set("phoneNumber", _params.phoneNumber);
        return foundAccountById.save();
    })
    .catch(function(error) {
        return error;
    });
}

module.exports = AccountModel; 



