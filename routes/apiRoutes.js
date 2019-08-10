var db = require("../models");

module.exports = function(app, passport) {
  // app.get("/api/login", function(req, res) {
  //   db.login.findAll({}).then(function(login) {
  //     res.json(login);
  //   });
  // });

  // LOGIN AUTHENTICATION Routing
  app.post(
    "/api/login",
    passport.authenticate("local", {
      failureFlash: "Invalid username or password.",
      successRedirect: "/admin",
      failureRedirect: "/index"
    })
  );

  // LOAD LOGIN PAGE
  app.get("/", function(req, res) {
    db.login.findAll({}).then(function(response) {
      console.log(response);
      res.render("index");
    });
  });

  // LOAD ADMIN PAGE with employees & tiers info
  app.get("/admin", function(req, res) {
    db.employees.findAll({}).then(function() {
      res.render("admin");
    });
    // add tiers to this page also
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
    db.employees.create(req.body).then(function(newTeamMember) {
      res.json(newTeamMember);
    });
  });

  // UPDATE TEAM MEMBER INFO
  app.put("/api/admin", function(req, res) {
    db.employees.update(req.body).then(function(teamMember) {
      res.json(teamMember);
    });
  });

  // UPDATE TIER HOURS
  app.put("/api/admin", function(req, res) {
    db.tiers.update(req.body).then(function(tier) {
      res.json(tier);
    });
  });
};
