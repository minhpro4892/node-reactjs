var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var logsSchema = new Schema({
  "fleetId": {
    type: String,
    required: true
  },
  "userId": {
    type: String,
    required: true
  },
  "operator": {
    type: String,
    default: ""
  },
  "fullName": {
    type: String
  },
  "userName": {
    type: String
  },
  "module": {
    type: String
  },
  "action": {
    type: String
  },
  "oldValue": {
    type: String,
    default: ""
  },
  "newValue": {
    type: String,
    default: ""
  },
  "description": {
    type: String,
    default: ""
  },
}, {
    "collection": "Logs",
    "timestamps": {
      createdAt: 'createdDate',
      updatedAt: 'latestUpdate'
    },
    "toJSON": {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._class;
      }
    }
  });

module.exports = mongoose.model('Logs', logsSchema);