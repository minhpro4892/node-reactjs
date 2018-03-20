var mongoose = require("mongoose");
var Promise = require("bluebird");
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: String,
    content: String,
    author: {
        type: String,
        ref: 'Account'
    }
}, {
    collection: 'Article',
    timestamps: {
        "createdAt": "createdDate",
        "updatedAt": "latestUpdate"
    }
});

module.exports = mongoose.model("Article", ArticleSchema);