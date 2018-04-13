let mysql = require("mysql");
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "todoapp"
});
connection.connect(function (error, result) {
    if (error) {
        return console.error('error: '+error.message);
    }

    console.log('Connected to my sql Server'+result);
});
connection.end(function (error, result) {
    if (error) {
        return console.error('error: ' + error.message);
    }
    console.log('Stop my sql Server' + result);
});