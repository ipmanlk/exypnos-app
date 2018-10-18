// define where are you
var currentPage = "post";

// selected post title will store here
var postTitle;

$(document).ready(function() {
  $('#navBar').load('navBar.html');
  loadPost();
  fixElementSizes();
  // show posts
  $("#loader").hide();
  $("#content").fadeIn();
});



function getJsonPostData() {
  return(JSON.parse(localStorage.getItem('postData')));
}