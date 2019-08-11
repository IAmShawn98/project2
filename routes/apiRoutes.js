var db = require("../models");

module.exports = function(app, passport) {
  
  // LOAD LOGIN PAGE
  app.get("/", function(req, res) {
    db.login.findAll({}).then(function(response) {
      console.log("response: " + response.login);
      res.render("index");
    });
  });

  //LOGIN AUTHENTICATION Routing
  app.post(
    "/api/login",
    passport.authenticate("local", {
      failureFlash: "Invalid username or password.",
      successRedirect: "/admin",
      failureRedirect: "/index"
    }),
    function(req, res) {
      res.json(req.user);
    }
  );

  // TAKE IN NEW ACCOUNT INFO
  app.post("/api/login", function(req, res) {
    db.login.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
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

  // TAKE IN NEW TEAM MEMBER INFO
  app.post("/api/admin", function(req, res) {
    db.employees.create(req.body).then(function(newTeamMember) {
      res.json(newTeamMember);
    });
  });

  // UPDATE TEAM MEMBER INFO
  app.put("/api/admin/:team_member", function(req, res) {
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

  // ADD PTO
  app.put("api/admin/:team_member", function(req, res) {
    db.employees.update(req.body).then(function(teamMember) {
      res.json(teamMember);
    });
  });
};
