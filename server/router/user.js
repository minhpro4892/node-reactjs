var UserCtrl = require('../controller/user');
var _ = require('lodash');
var api = {
    "login": '/api/user/login'
}

module.exports = function (app) {
    app.post(api.login, function(req, res, next) {
        res.send({
            status: 200,
            user: {
                username: 'minh_pro4892'
            }
        })
    });
}