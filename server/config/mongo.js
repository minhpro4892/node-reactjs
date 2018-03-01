var config = require('config');

exports.configMongoDb = function(mongoose) {
    // var mongoConfig = config.get('mongo');
    var mongoConfig = {
        "host": "mongodb://localhost/qupworld",
        "options": {
            "server": {
                "socketOptions": {
                    "keepAlive": 1
                }
            },
            "auto_reconnect": true,
            "user": "",
            "pass": ""
        }
    }
    var connect = function() {
        mongoose.connect(mongoConfig.host, mongoConfig.options);
    };
    connect();
    // Error handler
    mongoose.connection.on('error', function(err) {
        console.error('MongoDB Connection Error. Please make sure MongoDB is running. -> ' + err);
        process.exit(1);
    });
    mongoose.connection.on('connected', function() {
        console.info('MongoDB Connected');
    });

    // Reconnect when closed
    mongoose.connection.on('disconnected', function() {
        console.log('disconnected mongodb');
        process.exit(1);
    });
}