var mongoose = require('mongoose');
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
    }
});

module.exports = mongoose.model("Account", accountSchema);