function validateEmail($email) {
 var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  console.log(emailReg.test( $email ));
 return emailReg.test( $email );

}


$(document).ready(function() {
  $('#signbutton').click(function(event) {

if( validateEmail($("#email").val())) {

    var n = $('#signbutton')
    var s = document.URL
    s = s.substr(0, s.lastIndexOf('/')) + '/signup';
    $.post(s, {
        name: $("#username").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        city: $("#email").siblings('div').children().val()

      }).done(function(data) {
        if (data == "email aready registered") {
          $(n).siblings('.signmsg').empty().append("<strong>Email Already Registered</strong>");
          $(n).siblings('.signmsg').addClass("alert alert-danger alert-dismissible");
        }
        if (data == "User succesfully saved !") {
          $(n).siblings('.signmsg').empty().append("<strong>User succesfully saved !</strong> </br></br><strong>You will be redirected to login page shortly</strong>");
          $(n).siblings('.signmsg').addClass("alert alert-success alert-dismissible");
          setTimeout(function() {
            s = document.URL;
            window.location.href = s.substr(0, s.lastIndexOf('/')) + '/login';
          }, 2500);
        }

      })
      .fail(function(xhr, status, error) {
        console.log(error);
        $(n).siblings('.signmsg').empty().append("<strong>" + error + "  error<br> there might be insufficient Data</strong>");
        $(n).siblings('.signmsg').addClass("alert alert-danger alert-dismissible");
      });

}else {
  $('#signbutton').siblings('.signmsg').empty().append("<strong>Not a valid Email</strong>");
  $('#signbutton').siblings('.signmsg').addClass("alert alert-success alert-dismissible");
}






    return false;
  });
});
