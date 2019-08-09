//setup code to connect Node to MySQL.

// var PORT = process.env.PORT || 8080;

require("dotenv").config();
var keys = require("./keys.js");
var mysql = require("mysql");

var connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: keys.password,
    database: "timesheet_db"
  });
}

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // connection.end();
});

// Export the connection
module.exports = connection;
