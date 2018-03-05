var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    "username": {
        type: String,
        default: ''
    },
    "password": {
        type: String,
        default: ''
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
    }
}, {
    collection: "Account",
    timestamps: {
        "createdAt": "createdDate",
        "updatedAt": "latestUpdate"
    }
});

module.exports = mongoose.model("Account", accountSchema);