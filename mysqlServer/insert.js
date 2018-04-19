let mysql = require("mysql");
let mysqlConfig = require("./config");
let connection = mysql.createConnection(mysqlConfig);

connection.connect(function(error, result) {
    if (error) {
        console.error('Connected failed: '+error.message);
    }
    let data = `INSERT INTO todos(title, completed) VALUES ("test", 1)`;
    connection.query(data, function(error, result, fields) {
        if (error) {
            console.error('Insert data error: '+error.message);
        }
        console.log('Insert data successfully');
    })
});