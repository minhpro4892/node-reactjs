var UserCtrl = require('../controller/user');
var _ = require('lodash');
var api = {
    "create": "/api/user/create",
    "update": "/api/user/update",
    "login": "/api/user/login",
    "logout": "/api/user/logout",
}

module.exports = function (app) {
    app.post(api.create, function(req, res, next) {
        var userCtrl = new UserCtrl({});
        userCtrl.create(req.body).then(function(response) {
            res.send({ error: null, res: response });
        })
        .catch(function(error) {
            res.send({ error: error, res: null })
        });
    });

    
    app.post(api.update, function(req, res, next) {
        var userCtrl = new UserCtrl({});
        userCtrl.update(req.body).then(function(response) {
            res.send({ error: null, res: response });
        })
        .catch(function(error) {
            res.send({ error: error, res: null })
        });
    });

    app.post(api.login, function(req, res, next) {
        var userCtrl = new UserCtrl({});
        userCtrl.login(req.body).then(function (response) {
            res.send({ error: null, res: response });
        })
        .catch(function (error) {
            res.send({ error: error, res: null });
        })
    });

    app.post(api.logout, function (req, res, next) {
        res.send({ res: {} });
    });
}