// $(document).ready(function() {
// 		$('#login').click(function(event) {
//     			$.ajax({
//         type:'post',
// 				url: document.URL,
// 				data: {
// 					email: $('#email').val(),
// 					password: $('#passwordconf').val()
// 				},
// 				dataType: 'json'
// 			}).success(function(data) {
//         if(data.length)
//         {console.log(data);}
//         else {
//           console.log("i m a fool");
//         }
//
//       }).error(function(err){
//          console.log(JSON.parse.err);
//         });
// 			});
// 			return false;
// 		});

$(document).ready(function() {
  $('#login').click(function(event) {
    var n =$(this)
    $.post(document.URL, {
        email: $('#email').val(),
        password: $('#passwordconf').val()
      }).done(function(data) {
        console.log(data);
        if(data=="Not registered")
        {$(n).siblings('.msg').append( "<strong>Not registered</strong>" );
        $(n).siblings('.msg').addClass("alert alert-success alert-dismissible");
        }
        if(data=="Success")
        s=document.URL;
        window.location.href=s.substr(0,s.lastIndexOf('/'))+'/profile';

      })
      .fail(function(xhr, status, error) {
        console.log(error);
      })
  });
  return false;
});
