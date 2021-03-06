var db = require("../models");
require("passport");

module.exports = function(app, passport) {
  // LOAD LOGIN PAGE
  app.get("/", function(req, res) {
    db.logins.findAll({}).then(function(response) {
      for (var i = 0; i < response.length; i++) {
        console.log("response: " + JSON.stringify(response[i].username));
      }
      // res.json(response);
      res.render("index");
    });
  });

  //LOGIN AUTHENTICATION Routing
  app.post(
    "/api/logins",
    passport.authenticate("local", {
      failureFlash: "Invalid username or password.",
      successRedirect: "/admin",
      failureRedirect: "/index"
    }),
    function(req, res) {
      res.json(req.user);
      console.log("auth routing");
    }
  );

  // TAKE IN NEW ACCOUNT INFO
  app.post("/api/logins", function(req, res) {
    db.logins.create({
      team_member: req.body.newAccount,
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        console.log ("Req" + req);
        console.log("res" + res);
        res.redirect(307, "/api/logins");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });
  
  // LOAD ADMIN PAGE with employees & tiers info
  app.get("/admin", function(req, res) {
    db.employees.findAll({}).then(function(result) {
      db.tiers.findAll({}).then(function() {
        // PH
      });
      res.render("admin", { employees: result });
      console.log(result);

      // res.json(response);
    });
  });

  // CREATE ACCOUNT PAGE
  app.get("/create", function(req, res) {
    db.employees.findAll({}).then(function() {
      res.render("create");
    });
  });

      // TAKE IN NEW TEAM MEMBER INFO
  app.post("/api/newMember", function(req, res) {
    db.employees.create({
      team_member: req.body.team_member,
      title: req.body.title,
      tier_level: req.body.tier_level,
      hours_remaining: req.body.hours_remaining,
      start_date: req.body.start_date
    })
      .then(function() {
        res.redirect(307, "/api/admin");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // UPDATE TEAM MEMBER INFO
  app.put("/api/admin", function(req, res) {
    db.employees.update({
      team_member: req.body.team_member,
      title: req.body.title,
      tier_level: req.body.tier_level,
      hours_used: req.body.hours_used,
      hours_remaining: req.body.hours_remaining,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
    },
      {
        where: {
          id: req.body.id
        }
      }
      .then(function(teamMember) {
      res.json(teamMember);
      })
    );
  });

  // DELETE TEAM MEMBER
  app.delete("/api/admin:id", function(req, res) {
    db.employees.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(teamMember) {
      res.json(teamMember);
    });
  });

  // UPDATE TIER HOURS
  app.put("/api/admin", function(req, res) {
    db.tiers.update({
      blue: req.body.blue,
      green: req.body.green,
      purple: req.body.purple
    }).then(function(tier) {
      res.json(tier);
    });
  });

  // ADD PTO
  app.put("api/admin/:team_member", function(req, res) {
    db.employees.update(req.body).then(function(teamMember) {
      if (ptoRequested === teamMember) {
        if (hoursRequested <= hoursRemaining) {
          hoursRemaining - hoursRequested;
          hoursUsed + hoursRequested;
  
          // Submit Success.
          alert("You are a winner!");
  
        } else {
          // Submit Error.
          alert("You are a failure!");
        }
      }
      res.json(teamMember);
    });
  });
};
