$(document).ready(function() {

  // BUTTON HANDLING ---------------------------------------

  // NEW ACCOUNT button handling--------------
  $("#newAccount").on("click", function() {
    // take in the values from the input fields
    var username = $("#fEmail").val().trim();
    var password = $("#fPassword").val().trim();
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(username, password);
    $("#fEmail").val("");
    $("#fPassword").val("");
    // alert "new account added" (add a place for this in handlebars)
    $("#alert").text("New account added.");
  });

  // LOGIN button handling--------------
  $("#login").on("click", function() {
    // take in the values from the input fields
    var username = $("#fEmail").val().trim();
    var password = $("#fPassword").val().trim();
    // run through passport for authentication (does this need called?)

    loginUser(username, password);
    $("#fEmail").val("");
    $("#fPassword").val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the admin page - this function works for both new account and login.
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/admin");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }


// TO DO --------------------------------------
  // add team member button handling--------------
    //this button needs added to handlebars
  $("#addTeamMember").on("click", function() {
    // have form appear? a new handlebar?
    //take in new info & add to employees table of db
  });

  // edit team member info button handling--------------
  $("#btnEdit").on("click", function() {
    // get info based on id of member
    // update info then save to db (put/update in api)
  });

  // delete team member button handling--------------
  $("#btnDelete").on("click", function() {
    // delete team member from database (api/destroy)
  });

  // add pto submit button handling--------------
  $("#addPTO").on("click", function() {
    // calculate hours and add to hours used and take away from hours remaining
    $("#fNewMember").val().trim();
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    // how to get # of hours from dates inputted? (Each date = 8 hrs)
    var hoursRequested = (endDate - startDate) * 8;
    var hoursRemaining;
    var hoursUsed;
    // if hours used is less than hours remaining, give error message
    if (hoursRequested <= hoursRemaining) {
      hoursRemaining - hoursRequested;
      hoursUsed + hoursRequested;
    } else {
      $("#ptoAlert").text("You do not have enough PTO hours for this request.")
    }
  });

  // edit tiers button handling--------------
  $("#editTier").on("click", function() {

  });
});








// other example stuff currently not using v-------------------------v
// Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  username = fEmail.value;
  password = fPassword.value;

  console.log("event: " + username + " password: " + password);

  // var example = {
  //   text: $exampleText.val().trim(),
  //   description: $exampleDescription.val().trim()
  // };

  // if (!(example.text && example.description)) {
  //   alert("You must enter an example text and description!");
  //   return;
  // }

  // API.saveExample(example).then(function() {
  //   refreshExamples();
  // });

  // $exampleText.val("");
  // $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
