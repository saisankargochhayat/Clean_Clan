// function check_like(postId) {
//   console.log("check working");
//   var u = document.URL
//   u = u.substr(0, u.lastIndexOf('/')) + "/post/" + postId + "/checklike";
//   $.ajax({
//     url: u,
//     method: "GET"
//   }).
//   done(function(data) {
//
//     if(data==true)
//     {
//       $("#like" + postId).find('i').css("color", "green");
//      $("#like" + postId).attr('onclick', 'remove_like('"+post._id+"')');
//     }
//     console.log(data);
//   }).fail(function(xhr, status, error) {
//     console.log(error);
//
//   })
//
//
// }

//To add the user reputation to his schema (like_count)
// var repu=parseInt($("#repuword").text());
// // console.log(repu);
// function updateuserlikes(repu) {
//   console.log("i was called");
//   var u = document.URL
//   u = u.substr(0, u.lastIndexOf('/')) + "/post/" + repu;;
//
//   $.ajax({
//     url: u,
//     method: "PUT"
//   }).
//   done(function(data) {
//     console.log(data.like_count);
//   }).fail(function(xhr, status, error) {
//     console.log(error);
//
//   })
// }



function like_add(postId) {
  console.log("like working");
  var u = document.URL
  lastIndex=u.lastIndexOf('/');
  if(u[lastIndex+1]=='p'&&u[lastIndex+2]=='r'&&u[lastIndex+3]=='o')
  u = u.substr(0, u.lastIndexOf('/')) + "/post/" + postId + "/like";
  else {
            u = u.substr(0, u.lastIndexOf('/profile')) + "/post/" + postId + "/like";
  }
  $.ajax({
    url: u,
    method: "PUT"
  }).
  done(function(data) {
    // console.log(data.likes);
    $("#like" + postId).find('i').css("color", "green");
    $("#like" + postId).attr('onclick', "remove_like('"+postId+"')");
    v=parseInt($("#like-count" + postId).text());
     $("#like-count"+postId).text(v+1);
  }).fail(function(xhr, status, error) {
    console.log(error);

  })


}

function remove_like(postId) {
  console.log("unlike working");
  console.log(postId);
  var u = document.URL
  // u = u.substr(0, u.lastIndexOf('/')) + "/post/" + postId + "/unlike";
  lastIndex=u.lastIndexOf('/');
  if(u[lastIndex+1]=='p'&&u[lastIndex+2]=='r'&&u[lastIndex+3]=='o')
  u = u.substr(0, u.lastIndexOf('/')) + "/post/" + postId + "/unlike";
  else {
            u = u.substr(0, u.lastIndexOf('/profile')) + "/post/" + postId + "/unlike";
  }
  $.ajax({
    url: u,
    method: "PUT"
  }).
  done(function(data) {
    // console.log(data.likes);
    $("#like" + postId).find('i').css("color", "red");
    $("#like" + postId).attr('onclick', "like_add('"+postId+"')");
    q=parseInt($("#like-count"+postId).text());
     $("#like-count"+postId).text(q-1);
  }).fail(function(xhr, status, error) {
    console.log(error);

  })


}
