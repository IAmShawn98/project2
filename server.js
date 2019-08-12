// Node Packages.
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");
var session = require("express-session");
var flash = require("connect-flash");

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// LOGIN AUTHENTICATION Configuration -------------------------
passport.use(
  new LocalStrategy(
    {
      username: "fEmail",
    },
    function(username, password, done) {
      db.logins
        .findOne({
          where: {
            username: username
          }
        })
        .then(function(username) {
          // If there's no user with the given email
          if (!username) {
            return done(null, false, {
              message: "Incorrect email."
            });
          }
          // If there is a user with the given email, but the password the user gives us is incorrect
          else if (!username.validPassword(password)) {
            return done(null, false, {
              message: "Incorrect password."
            });
          }
          // If none of the above, return the user
          return done(null, username);
        });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
// ----------------------------------------------------

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
app.use(flash());

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

// Exports
module.exports = app;
module.exports = passport;
