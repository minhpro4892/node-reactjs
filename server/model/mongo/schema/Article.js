'use strict';
var mongoose = require("mongoose");
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