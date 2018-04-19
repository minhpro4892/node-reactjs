let mysql = require("mysql");
let mysqlConfig = require("./config");
let connection = mysql.createConnection(mysqlConfig);

connection.connect(function(error, result) {
    if (error) {
        console.error('Connection failed: '+error.message);
    }
    let data = {
        table: 'todos',
        title: 'test111',
        id: 1
    }
    let updatedTotos = `UPDATE ` + data.table +
    ` SET title= ` + `?` + ` WHERE id = ? `;
    connection.query(updatedTotos, [data.title, data.id], function(error, result, fields) {
        if (error) {
            console.error('Update failed: '+error.message);
        }
        console.log('Update todos successfully: '+result.affectedRows);
    });
    connection.end();
});