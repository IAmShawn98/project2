// Node Packages.
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");
var session = require("express-session");

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// LOGIN AUTHENTICATION Configuration
passport.use(
  new LocalStrategy(function(username, password, done) {
    db.login.findOne({ username: username }, function(err, login) {
      console.log(login);
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, login);
    });
  })
);

// Define a new express instance.
var app = express();

// Define the port our server will listen on.
var PORT = process.env.PORT || 3000;

// Middleware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "mysecretkey" }));
app.use(passport.initialize());
app.use(passport.session());
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
require("./routes/apiRoutes")(app, passport);
require("./routes/htmlRoutes")(app, passport);

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
