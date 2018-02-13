var UserCtrl = require('../controller/user');
var _ = require('lodash');
var api = {
    "login": '/api/user/login',
    "logout": '/api/user/logout'
}

module.exports = function (app) {
    app.post(api.login, function(req, res, next) {
        res.send({
            res: {
                user: {
                    username: 'minh_pro4892'
                },
                token: '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
            }
        });
    });

    app.post(api.logout, function (req, res, next) {
        res.send({ res: {} });
    });
}