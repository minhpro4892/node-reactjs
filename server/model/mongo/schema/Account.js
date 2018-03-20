'use strict';
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    "username": {
        type: String,
        default: ''
    },
    "firstName": {
        type: String,
        default: ''
    },
    "lastName": {
        type: String,
        default: ''
    },
    "token": { type: String },
    "isAdmin": {
        type: Boolean,
        default: false
    },
    "defaultPw": {
        type: Boolean,
        default: false
    },
    "password": {
        type: String
    },
    "rememberMe": {
        type: Boolean,
        default: false
    },
    "isActive": {
        type: Boolean,
        default: true
    },
    "phoneNumber": {
        type: String,
        default: ''
    },
    "email": {
        type: String,
        default: ''
    },
    "birthyear": {
        type: Date,
        default: new Date()
    },
    "address": {
        type: String,
        default: ''
    },
    "roleName": {
        type: String,
        default: 'user'
    },
    "tokenExpiredAt": {
        type: Date,
        default: new Date()
    }
}, {
    collection: "Account",
    timestamps: {
        "createdAt": "createdDate",
        "updatedAt": "latestUpdate"
    }
});

AccountSchema.pre('save', function(next) {
    this.set('userId', this._id);
    this.set('fullName', `${this.firstName}${this.lastName}`);
    next();
}) 

module.exports = mongoose.model("Account", AccountSchema);