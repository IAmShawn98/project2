// Node Packages.
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");

// Define a new express instance.
var app = express();

// Define the port our server will listen on.
var PORT = process.env.PORT || 3000;

// Middleware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Serve our 'public' static files.
app.use(express.static("public"));

// Handlebars View Engine.
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
// Set our view engine as 'Handlebars'.
app.set("view engine", "handlebars");

// App Routing.
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`.
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

// Export App.
module.exports = app;
