var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.login
      .bulkCreate([
        {
          team_member: "Bob McBob",
          username: "bob@gmail.com",
          password: "123456"
        },
        {
          team_member: "Lilly McBob",
          username: "lilly@gmail.com",
          password: "thisismypassword"
        },
        {
          team_member: "Phil McBob",
          username: "phil@gmail.com",
          password: "ilikecheesesteaks"
        }
      ])
      .then(function() {
        // Request the route that returns all examples
        request.get("/api/login").end(function(err, res) {
          var responseStatus = res.status;
          var responseBody = res.body;

          // Run assertions on the response

          expect(err).to.be.null;

          expect(responseStatus).to.equal(200);

          expect(responseBody)
            .to.be.an("array")
            .that.has.lengthOf(3);

          expect(responseBody[0])
            .to.be.an("object")
            .that.includes({
              team_member: "Bob McBob",
              username: "bob@gmail.com",
              password: "123456"
            });

          expect(responseBody[1])
            .to.be.an("object")
            .that.includes({
              team_member: "Lilly McBob",
              username: "lilly@gmail.com",
              password: "thisismypassword"
            });

          expect(responseBody[2])
            .to.be.an("object")
            .that.includes({
              team_member: "Phil McBob",
              username: "phil@gmail.com",
              password: "ilikecheesesteaks"
            });

          // The `done` function is used to end any asynchronous tests
          done();
        });
      });
  });
});
