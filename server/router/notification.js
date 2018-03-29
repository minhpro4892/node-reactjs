import { error } from 'util';

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
        var notificationCtrl = new NotificationCtrl(req.body);
        notificationCtrl.create(req.body).then(function(response) {
            res.send({error: null, data: response});
        })
        .catch(function(error) {
            res.send({error: error, data: null});
        });
    });
    
    app.post(api.getAll, function (req, res, next) {
        var notificationCtrl = new NotificationCtrl({});
        notificationCtrl.getAll(req.query).then(function(response) {
            res.send({error: null, data: response});
        })
        .catch(function(error) {
            res.send({error: error, data: null});
        });
    });
}
