// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var joi = require("./middleware/validation/joi");
var tracer = require("./middleware/tracer");
var logger = require('./controller/logger');
var jwt_redis = require("./middleware/jwt-redis-session");
var redisClient = require('./config/redis').redisClient;
var constants = require('./config/constants');
var tracer = require('./middleware/tracer');
var fs = require('fs');
require('./config/mongo').configMongoDb(mongoose);
var  app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var router = express.Router();
// parse application/json
app.use(bodyParser.json());
app.use(tracer);
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, x-request-id'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true);
  logger.log("INFO", "Request: ", req.url, null, null, req.requestId);
  next();
})

fs.readdirSync(__dirname + '/model/mongo/schema').forEach(function (file) {
  if (~file.indexOf('.js')) {
    //console.log(file);
    require(__dirname + '/model/mongo/schema' + '/' + file);
  }
});

app.use(jwt_redis({
  client: redisClient,
  keyspace: constants['REDIS_KEY'].CC_SESSION_KEY,
  secret: constants['SECURE']
}));
app.use(joi);
app.use(router);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
require('./router')(app);
require('./config/socket')(io);
module.exports = app;
