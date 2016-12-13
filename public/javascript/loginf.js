

$(document).ready(function() {
  $('#login').click(function(event) {
    var n = $(this)
    $.post(document.URL, {
        email: $('#email').val(),
        password: $('#passwordconf').val()
      }).done(function(data) {
        console.log(data);
        if (data == "Not registered") {
          $(n).siblings('.msg').empty().append("<strong>Not Registered !</strong> </br></br><strong>You will be redirected to signup page shortly</strong>");
          $(n).siblings('.msg').addClass("alert alert-danger alert-dismissible");
          setTimeout(function() {
            s = document.URL;
            window.location.href = s.substr(0, s.lastIndexOf('/')) + '/signup';
          }, 2500);
        }
        if (data == "Success") {
          s = document.URL;
          window.location.href = s.substr(0, s.lastIndexOf('/')) + '/profile';
        }
        if (data == "wrong password") {
          $(n).siblings('.msg').empty().append("<strong>Wrong Password</strong>");
          $(n).siblings('.msg').addClass("alert alert-danger alert-dismissible");
        }

      })
      .fail(function(xhr, status, error) {
        console.log(error);
        $(n).siblings('.msg').empty().append("<strong>" + error + "  error,<br> there might be insufficient Data</strong>");
        $(n).siblings('.msg').addClass("alert alert-danger alert-dismissible");
      })
  });
  return false;
});
