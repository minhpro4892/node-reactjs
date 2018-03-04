var UserCtrl = require('../controller/user');
var _ = require('lodash');
var api = {
    "create": "/api/user/create",
    "login": '/api/user/login',
    "logout": '/api/user/logout',
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

    app.post(api.login, function(req, res, next) {
        console.log(req.session);
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