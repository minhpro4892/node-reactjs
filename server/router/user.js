var UserCtrl = require('../controller/user');
var _ = require('lodash');
var logMiddleware = require('./../middleware/logs')
var api = {
    "find": "/api/user/find",
    "create": "/api/user/create",
    "update": "/api/user/update",
    "delete": "/api/user/delete",
    "resetPassword": "/api/user/resetPassword",
    "changePassword": "/api/user/changePassword",
    "login": "/api/user/login",
    "logout": "/api/user/logout",
}

module.exports = function (app) {
    app.post(api.find, function (req, res, next) {
        var userCtrl = new UserCtrl({});
        userCtrl.find(req.body).then(function (response) {
            res.send({ error: null, res: response });
        })
            .catch(function (error) {
                res.send({ error: error, res: null })
            });
    });
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

    app.post(api.delete, function (req, res, next) {
        var userCtrl = new UserCtrl({});
        userCtrl.delete(req.body).then(function (response) {
            res.send({ error: null, res: response });
        })
            .catch(function (error) {
                res.send({ error: error, res: null })
            });
    });

    app.post(api.resetPassword, function(req, res, next) {
        var userCtrl = new UserCtrl({});
        userCtrl.resetPassword(req.body).then(function(response) {
            res.send({ error: null, res: response });
        })
        .catch(function(error) {
            res.send({ error: error, res: null })
        });
    });

    app.post(api.changePassword, function(req, res, next) {
        var userCtrl = new UserCtrl({});
        userCtrl.changePassword(req.body).then(function(response) {
            res.send({ error: null, res: response });
        })
        .catch(function(error) {
            res.send({ error: error, res: null })
        });
    });

    app.post(api.login, function(req, res, next) {
        var userCtrl = new UserCtrl({});
        userCtrl.login(req.body).then(function (response) {
            if (response && response.errorCode) {
                res.send({ error: response, res: null });
            }
            req.session.user = response;
            req.session.rememberMe = req.body.rememberMe;
            res.session.save().then(function (error, token) {
                if (error) return next(error);
                res.send({ error: null, res: { token: token, user: response } });
            });
        })
        .catch(function (error) {
            res.send({ error: error, res: null });
        })
    });

    app.post(api.logout, function (req, res, next) {
        if (req.session) {
            req.session.destroy().then(function (error, response) {
                if (error) return next(error);
                res.send({ res: {} });
            });
        } else {
            res.send({ res: {} });
        }
    });
}