let mysql = require("mysql");
let mysqlConfig = require("./config");
let connection = mysql.createConnection(mysqlConfig);
connection.connect(function (error, result) {
    if (error) {
        return console.error('error: '+error.message);
    }
    let createTodoTable = `CREATE TABLE IF NOT EXISTS todos(
        id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        title varchar(255),
        time timestamp DEFAULT CURRENT_TIMESTAMP,
        completed tinyint(1) NOT NULL DEFAULT 0
    )`;
    connection.query(createTodoTable, function(error, results, fields) {
        if (error) {
            console.error('error in creating table: '+error.message);
        }
        console.log('Create table successfully');
    });

    console.log('Connected to my sql Server'+result);
});
// connection.end(function (error, result) {
//     if (error) {
//         return console.error('error: ' + error.message);
//     }
//     console.log('Stop my sql Server' + result);
// });