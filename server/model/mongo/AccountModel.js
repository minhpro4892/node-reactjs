var Promise = require('bluebird');
var _ = require('lodash');
var util = require('util');
var Account = require("./schema/Account.js");
var BaseModel = require('./BaseModel');

function AccountModel(_params) {
    BaseModel.call(this, _params);
}
util.inherits(AccountModel, BaseModel);

AccountModel.prototype.save = function(_params) {
    var account = new Account();
    return account.save(_params);
}

AccountModel.prototype.findOne = function(_params) {
    var accountQueryParams = {
        query: {
            username: _params.username
        }
    }
    return Account.findOne(accountQueryParams)
    .then(function(foundAccountByUsername) {
        if (!foundAccountByUsername) {
            return {
                status: 404,
                message: "User not found"
            }
        }
        return {
            status: 200,
            user: foundAccountByUsername,
            token: '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
        }
    });
}

module.exports = AccountModel; 



