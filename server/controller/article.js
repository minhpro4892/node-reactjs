var BaseCtrl = require('./base');
var _ = require('lodash');
var Promise = require('bluebird');
var util = require('util');
var ArticleModel = require("../model/mongo/ArticleModel");
var exportFile = require("./exportFile");

function ArticleCtrl(params) {
    params = params || {};
    BaseCtrl.call(this, params);
    this.articleModel = new ArticleModel();
}
util.inherits(ArticleCtrl, BaseCtrl);

ArticleCtrl.prototype.find = function (params, tracer) {
    var self = this;
    return self.articleModel.find(params, tracer);   
}

ArticleCtrl.prototype.findOne = function (params, tracer) {
    var self = this;
    return self.articleModel.findOne(params, tracer);   
}

ArticleCtrl.prototype.export = function (params, tracer) {
    var self = this;
    var query = {};
    if (params.query && params.query.startDate) {
        query.createdDate = query.createdDate || {};
        query.createdDate.$gte = params.query.startDate;
    }

    if (params.query && params.query.endDate) {
        query.createdDate = query.createdDate || {};
        query.createdDate.$lte = params.query.endDate;
    }

    if (params.query && params.query.str) {
        var searchString = params.query.str.trim();
        searchString = searchString.replace(/\++/, "");
        var regexOption = { $regex: searchString, $options: "i" };
        query.$or = [
            { title: regexOption },
            { content: regexOption }
        ]
    }

    return exportFile.exportToCSV({
        sheetName: "Article",
        columns: [
            { header: 'Title', key: 'title', width: 20},
            { header: 'content', key: "content", width: 17}
        ],
        model: "Article",
        query: query
    }, tracer);
}

ArticleCtrl.prototype.create = function (params, tracer) {
    var self = this;
    return self.articleModel.create(params, tracer);
}

ArticleCtrl.prototype.update = function (params, tracer) {
    var self = this;
    return self.articleModel.update(params, tracer);
}

ArticleCtrl.prototype.delete = function (params, tracer) {
    var self = this;
    return self.articleModel.delete(params, tracer);
}

module.exports = ArticleCtrl;
