var db = require("../models");

module.exports = function(app) {
  // Login page
  app.get("/", function(req, res) {
    db.login.findAll({}).then(function() {
      res.render("index");
    });
  });

  // Main admin page
  app.get("/admin", function(req, res) {
    db.employees.findAll({}).then(function() {
      res.render("admin");
    });
    // add tiers to this page also....not sure if this is correct
    // db.tiers.findAll({}).then(function() {
    //   res.render("admin");
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
