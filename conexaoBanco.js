var mysql = require("mysql");
 
var conecteBanco = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "blog"
});
 
module.exports = conecteBanco;