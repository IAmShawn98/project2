var db = require("../models");

// var passport = require("passport");
// LocalStrategy = require("passport-local").Strategy;

module.exports = function(app) {
  // LOAD LOGIN PAGE
  app.get("/", function(req, res) {
    db.login.findAll({}).then(function() {
      res.render("index");
    });
  });

  // // LOGIN AUTHENTICATION Configuration
  // passport.use(
  //   new LocalStrategy(function(username, password, done) {
  //     login.findOne({ username: username }, function(err, login) {
  //       if (err) {
  //         return done(err);
  //       }
  //       if (!user) {
  //         return done(null, false, { message: "Incorrect username." });
  //       }
  //       if (!user.validPassword(password)) {
  //         return done(null, false, { message: "Incorrect password." });
  //       }
  //       return done(null, login);
  //     });
  //   })
  // );

  // // LOGIN AUTHENTICATION Routing
  // app.post(
  //   "/",
  //   passport.authenticate("local", {
  //     failureFlash: "Invalid username or password.",
  //     successRedirect: "/admin",
  //     failureRedirect: "/index"
  //   })
  // );

  // LOAD ADMIN PAGE with employees & tiers info
  app.get("/admin", function(req, res) {
    db.employees.findAll({}).then(function() {
      res.render("admin");
    });
    // add tiers to this page also....not sure if this is correct
    db.tiers.findAll({}).then(function() {
      res.render("admin");
    });
  });

  // TAKE IN NEW ACCOUNT INFO
  app.post("/api/login", function(req, res) {
    db.login.create(req.body).then(function(newUser) {
      res.json(newUser);
    });
  });

  // TAKE IN NEW TEAM MEMBER INFO
  app.post("/api/admin", function(req, res) {
    db.employees.create(req.body).then(function(newTeamMember){
      res.json(newTeamMember);
    });
  });

  // UPDATE TEAM MEMBER INFO ------this will probably need adjusted
  app.put("/api/admin", function(req, res) {
    db.employees.update(req.body).then(function(teamMember){
      res.json(teamMember);
    });
  });

  // UPDATE TIER HOURS ------this will probably need adjusted
  app.put("/api/admin", function(req, res) {
    db.tiers.update(req.body).then(function(tier){
      res.json(tier);
    });
  });
};
