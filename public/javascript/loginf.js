
function validateEmail($email) {
 var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  console.log(emailReg.test( $email ));
 return emailReg.test( $email );

}

$(document).ready(function() {
  $('#loginform').submit(function(event) {
event.preventDefault()
if( validateEmail($("#email").val())) {

    var n = $("#loginbutton")
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

    }else {
      $('#loginbutton').siblings('.msg').empty().append("<strong>Not a valid Email</strong>");
      $('#loginbutton').siblings('.msg').addClass("alert alert-success alert-dismissible");
    }


  });
  return false;
});
