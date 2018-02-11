var UserCtrl = require('../controller/user');
var _ = require('lodash');
var api = {
    "login": '/api/user/login'
}

module.exports = function (app) {
    console.log('debug login func')
    app.post(api.login, function(req, res) {
        console.log('debug login func 1')
        res.send({
            status: 200,
            user: {
                username: 'minh_pro4892'
            }
        })
    });
}