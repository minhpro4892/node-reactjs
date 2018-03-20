var ArticleCtrl = require('../controller/user');
var _ = require('lodash');
var logMiddleware = require('./../middleware/logs')
var api = {
    "find": "/api/article/find",
    "create": "/api/article/create",
    "update": "/api/article/update",
    "delete": "/api/article/delete",
}

module.exports = function (app) {
    app.post(api.find, function (req, res, next) {
        var ArticleCtrl = new ArticleCtrl({});
        ArticleCtrl.find(req.body).then(function (response) {
            res.send({ error: null, res: response });
        })
            .catch(function (error) {
                res.send({ error: error, res: null })
            });
    });

    app.post(api.create, function (req, res, next) {
        var ArticleCtrl = new ArticleCtrl(req.body);
        ArticleCtrl.create(req.body).then(function (response) {
            res.send({ error: null, res: response });
        })
            .catch(function (error) {
                res.send({ error: error, res: null })
            });
    });


    app.post(api.update, function (req, res, next) {
        var ArticleCtrl = new ArticleCtrl(req.body);
        ArticleCtrl.update(req.body).then(function (response) {
            res.send({ error: null, res: response });
        })
            .catch(function (error) {
                res.send({ error: error, res: null })
            });
    });


    app.post(api.delete, function (req, res, next) {
        var ArticleCtrl = new ArticleCtrl(req.body);
        ArticleCtrl.delete(req.body).then(function (response) {
            res.send({ error: null, res: response });
        })
            .catch(function (error) {
                res.send({ error: error, res: null })
            });
    });
}