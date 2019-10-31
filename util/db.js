let mysql = require('mysql2');

let con = mysql.createConnection({
    host: "remotemysql.com",
    user: "5NCK7LdoBu",
    database: '5NCK7LdoBu',
    password: "lH8fYMbLVz"
});

module.exports = con.promise();
