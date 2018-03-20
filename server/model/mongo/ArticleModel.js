var Promise = require('bluebird');
var _ = require('lodash');
var util = require('util');
var Article = require("./schema/Article.js");
var BaseModel = require('./BaseModel');
var logger = require('./../../controller/logger');

function ArticleModel(_params) {
    BaseModel.call(this, _params);
}
util.inherits(ArticleModel, BaseModel);

ArticleModel.prototype.find = function (_params, tracer) {
    return Promise.all([
        Article.find({})
            .sort(_params.sort)
            .limit(_params.limit || 10)
            .skip(_params.skip || 0)
            .populate('author'),
        Article.count()
    ])
        .spread(function (list, total) {
            logger.log("DEBUG", "AccountModel.find", "return data of find()", list, null, tracer);
            return { list, total };
        })
        .catch(function (error) {
            logger.log('ERROR', "AccountModel.find", "error", null, error, tracer);   
        }); 
}

ArticleModel.prototype.create = function (_params, tracer) {
    var article = new Article(_params);
    return article.save();
}

ArticleModel.prototype.findOne = function (_params, tracer) {
    return Article.findOne({_id: _params.articleId})
    .then(function (foundArticleById) {
        if (!foundArticleById) {
            return Promise.reject({
                status: 404,
                error: 400004,
                message: "Acticle not found"
            });
        }
        foundArticleById.set("title", _params.title);
        foundArticleById.set("content", _params.content);
        foundArticleById.set("author", _params.author);
        logger.log("DEBUG", "ArticleModel.update", "return data of findOne()", foundArticleById, null, tracer);
        return foundArticleById.save();
    })
    .catch(function (error) {
            logger.log("ERROR", "ArticleModel.update", "error", null, error, tracer);
        return error;
    });
}

ArticleModel.prototype.delete = function (_params) {
    return Article.findOne({ _id: _params.articleId })
        .then(function (foundArticleById) {
            if (!foundArticleById) {
                return Promise.reject({
                    status: 404,
                    error: 400004,
                    message: "Acticle not found"
                });
            }
            foundArticleById.set("title", _params.title);
            foundArticleById.set("content", _params.content);
            foundArticleById.set("author", _params.author);
            logger.log("DEBUG", "ArticleModel.delete", "return data of findOne()", foundArticleById, null, tracer);
            return foundArticleById.remove();
        })
        .catch(function (error) {
            logger.log("ERROR", "ArticleModel.delete", "error", null, error, tracer);
            return error;
        });
}

module.exports = ArticleModel;