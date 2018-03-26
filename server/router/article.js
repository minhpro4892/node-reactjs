var ArticleCtrl = require('../controller/article');
var _ = require('lodash');
var logMiddleware = require('./../middleware/logs')
var fs = require('fs');
var api = {
    "find": "/api/article/find",
    "create": "/api/article/create",
    "update": "/api/article/update",
    "delete": "/api/article/delete",
    "findOne": "/api/article/findOne",
    "export": "/api/article/export"
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

    app.get(api.findOne, function (req, res, next) {
        var articleCtrl = new ArticleCtrl({});
        articleCtrl.findOne(req.query).then(function (response) {
            res.send({ error: null, res: response });
        })
            .catch(function (error) {
                res.send({ error: error, res: null })
            });
    });

    app.post(api.export, function (req, res, next) {
        var articleCtrl = new ArticleCtrl(req.body);
        articleCtrl.export(req.body).then(function (response) {
            console.log('debug exportToCSV'+JSON.stringify(response));
            var filestream = fs.createReadStream(response);
            res.setHeader('Content-Type', 'application/vnd.openxmlformates');
            res.setHeader("Content-Disposition", "attachment;filename=" + "articles.csv");
            filestream.pipe(res);
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