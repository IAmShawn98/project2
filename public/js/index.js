$(document).ready(function() {

  // BUTTON HANDLING ---------------------------------------

  // NEW ACCOUNT button handling--------------
  $("#newAccount").on("click", function () {
    console.log("newAccount button pressed")
    // take in the values from the input fields
    var newAccount = $("#fNewMember").val().trim();
    var username = $("#username").val().trim();
    var password = $("#password").val().trim();
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(username, password);
    $("#username").val("");
    $("#password").val("");
    // alert "new account added" (add a place for this in handlebars)
    $("#alert").text("New account added.");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the admin page - this function should work for both new account and login.
  function loginUser(username, password) {
    console.log(username, password);
    $.post("/api/logins", {
      username: username,
      password: password
    })
      .then(function() {
        console.log("post request");
        window.location.replace("/admin");

        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log("Error" + JSON.stringify(err));
      });
  }

  // LOGIN button handling--------------
  $("#login").on("click", function () {
    console.log("login button pressed");
    // take in the values from the input fields
    var username = $("#username").val().trim();
    var password = $("#password").val().trim();


    loginUser(username, password);

    console.log("Username: " + username);
    console.log("Password: " + password);

    $("#username").val("");
    $("#password").val("");
  });

  // ADD TEAM MEMBER button handling--------------
  $("#addTeamMember").on("click", function () {
    //take in new info & add to employees table of db
    var team_member = $("#team_member").val().trim();
    var title = $("#title").val().trim();
    var tier_level = $("#tier_level").val().trim();
    var hours_remaining = $("#hours_remaining").val().trim();
    var start_date = $("#start_date").val().trim();

    addTeamMember(team_member, title, tier_level, hours_remaining, start_date);
  });

  function addTeamMember(team_member, title, tier_level, hours_remaining, start_date) {
    $.post("/api/admin", {
      team_member: team_member,
      title: title,
      tier_level: tier_level,
      hours_remaining: hours_remaining,
      start_date: start_date
    })
      .then(function () {
        window.location.replace("/admin");
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // EDIT TEAM MEMBER INFO button handling--------------
  $(document).on("click", "btnEdit", handleMemberEdit);

  // get info based on id of member  ---- not sure if this is correct yet
  function handleMemberEdit() {
    var currentMember = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/admin?id=" + currentMember.id;
  }

  // DELETE TEAM MEMBER button handling--------------
  $(document).on("click", "btnDelete", handleMemberDelete);

  function handleMemberDelete(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/admin/" + id
    })
      .then(function () {
        window.location.replace("/admin");
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // add pto submit button handling--------------
  $("#addPTO").on("click", function () {
    // calculate hours and add to hours used and take away from hours remaining
    $("#fNewMember").val().trim();
   var hoursRequested = $("#hoursRequested").val();
   var hoursUsed;
   // if hours used is less than hours remaining, give error message
   if (hoursRequested <= hoursRemaining) {
     hoursRemaining - hoursRequested;
     hoursUsed + hoursRequested;

      // Submit Success.
      $("#ptoSuccess").show();

    } else {
      // Submit Error.
      $("#ptoFail").show();
    }
  });

  // edit tiers button handling--------------
  $("#editTier").on("click", function () {
    $.ajax({
      method: "PUT",
      url: "/api/admin",
      data: hours
    }).then(function () {
      window.location.href = "/admin";
    });
  });
});
