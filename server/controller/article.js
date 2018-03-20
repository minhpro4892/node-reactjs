var BaseCtrl = require('./base');
var _ = require('lodash');
var Promise = require('bluebird');
var util = require('util');
var ArticleModel = require("../model/mongo/ArticleModel");

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
