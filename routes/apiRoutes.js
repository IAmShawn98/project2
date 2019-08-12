var db = require("../models");

// var passport = require("passport");
// LocalStrategy = require("passport-local").Strategy;

module.exports = function(app) {
  // LOGIN PAGE
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

  // ADMIN PAGE
  app.get("/admin", function(req, res) {
    db.employees.findAll({}).then(function() {
      res.render("admin");
    });
    // add tiers to this page also....not sure if this is correct
    // db.tiers.findAll({}).then(function() {
    //   res.render("admin");
  });

  // CREATE ACCOUNT PAGE
  app.get("/create", function(req, res) {
    db.employees.findAll({}).then(function() {
      res.render("create");
    });
  });

  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
