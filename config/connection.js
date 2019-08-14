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
    host: "tkck4yllxdrw0bhi.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "mbzy4defha8l2w70",
    password: "xhuhpfpprpwr9yy6",
    database: "the7mslfkxp2qjzy"
  });
}

connection.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log("connected as id " + connection.threadId);
  // connection.end();
});

// Export the connection
module.exports = connection;
