$(document).ready(function() {
  $('#signbutton').click(function(event) {
    var n = $(this)
    var s = document.URL
    s = s.substr(0, s.lastIndexOf('/')) + '/signup';
    $.post(s, {
        name: $("#username").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        city: $("#email").siblings('div').children().val()

      }).done(function(data) {
        if (data == "email aready registered") {
          $(n).siblings('.signmsg').append("<strong>Email Already Registered</strong>");
          $(n).siblings('.signmsg').addClass("alert alert-danger alert-dismissible");
        }
        if (data == "User succesfully saved !") {
          $(n).siblings('.signmsg').append("<strong>User succesfully saved !</strong> </br></br><strong>You will be redirected to login page shortly</strong>");
          $(n).siblings('.signmsg').addClass("alert alert-success alert-dismissible");
          setTimeout(function() {
            s = document.URL;
            window.location.href = s.substr(0, s.lastIndexOf('/')) + '/login';
          }, 2500);
        }

      })
      .fail(function(xhr, status, error) {
        console.log(error);
        $(n).siblings('.signmsg').append("<strong>Insufficient Data</strong>");
        $(n).siblings('.signmsg').addClass("alert alert-danger alert-dismissible");
      });
    return false;
  });
});
