var NotificationCtrl = require('../controller/notification');
var _ = require('lodash');
var logMiddleware = require('./../middleware/logs')

var api = {
    'create': '/api/notification/create',
    'getAll': '/api/notification/getAll',
    'delete': '/api/notification/delete',
    'view': '/api/notification/view'
}

module.exports = function (app) {
    app.post(api.create, function (req, res, next) {

    });
    
    app.get(api.getAll, function (req, res, next) {
        
    });
}
