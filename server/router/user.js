var UserCtrl = require('../controller/user');
var _ = require('lodash');
var api = {
    "login": '/api/user/login',
    "logout": '/api/user/logout'
}

module.exports = function (app) {
    app.post(api.login, function(req, res, next) {
        console.log(req.session);
        var userCtrl = new UserCtrl({
            username: req.body.username
        });
        userCtrl.login(req.body.username).then(function (response) {
            res.send({ res: response });
        })
        .catch(function (error) {
            res.send({ error: error});
        })
    });

    app.post(api.logout, function (req, res, next) {
        res.send({ res: {} });
    });
}