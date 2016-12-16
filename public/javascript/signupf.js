function validateEmail($email) {
 var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  console.log(emailReg.test( $email ));
 return emailReg.test( $email );

}


$(document).ready(function() {
  $('#signupform').submit(function(event) {
    event.preventDefault()
    if( validateEmail($("#email").val())) {
    var n = $(document.getElementById('signbutton'))
    var s = document.URL
    var data = new FormData($(this)[0]);
    console.log(data.get('image'));
    $.ajax({
        url : '/signup',
        method:'POST',
        data : data,
        contentType:false,
        processData:false,
        success:function(data) {
          if(data=="Exceeds file limit")
          {
            $(n).siblings('.signmsg').empty().append("<strong>Exceeds file limit,You can upload only one profile pic</strong>");
            $(n).siblings('.signmsg').addClass("alert alert-danger alert-dismissible");
          }
          if (data == "email already registered") {
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
        },
        error : function(xhr, status, error) {
          console.log(error);
          $(n).siblings('.signmsg').empty().append("<strong>" + error + "  error,<br> there might be insufficient Data</strong>");
          $(n).siblings('.signmsg').addClass("alert alert-danger alert-dismissible");
        }
      });

  }else {
    $('#signbutton').siblings('.signmsg').empty().append("<strong>Not a valid Email</strong>");
    $('#signbutton').siblings('.signmsg').addClass("alert alert-success alert-dismissible");
  }
    return false;
  });
});
