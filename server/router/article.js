var ArticleCtrl = require('../controller/article');
var _ = require('lodash');
var logMiddleware = require('./../middleware/logs')
var api = {
    "find": "/api/article/find",
    "create": "/api/article/create",
    "update": "/api/article/update",
    "delete": "/api/article/delete",
}

module.exports = function (app) {
    app.get(api.find, function (req, res, next) {
        var articleCtrl = new ArticleCtrl({});
        articleCtrl.find(req.body).then(function (response) {
            res.send({ error: null, res: response });
        })
            .catch(function (error) {
                res.send({ error: error, res: null })
            });
    });

    app.post(api.create, function (req, res, next) {
        var articleCtrl = new ArticleCtrl(req.body);
        articleCtrl.create(req.body).then(function (response) {
            res.send({ error: null, res: response });
        })
            .catch(function (error) {
                res.send({ error: error, res: null })
            });
    });


    app.post(api.update, function (req, res, next) {
        var articleCtrl = new ArticleCtrl(req.body);
        articleCtrl.update(req.body).then(function (response) {
            res.send({ error: null, res: response });
        })
            .catch(function (error) {
                res.send({ error: error, res: null })
            });
    });


    app.post(api.delete, function (req, res, next) {
        var articleCtrl = new ArticleCtrl(req.body);
        articleCtrl.delete(req.body).then(function (response) {
            res.send({ error: null, res: response });
        })
            .catch(function (error) {
                res.send({ error: error, res: null })
            });
    });
}