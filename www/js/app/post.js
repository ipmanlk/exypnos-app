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

function loadPost() {
  var id = ($(location).attr('href')).split('id=')[1];
  var postData = getJsonPostData();
  for (post in postData) {
    if (postData[post].post_id == id) {
      $("#title").html(postData[post].title);
      postTitle = postData[post].title;
      $("#datatime").html(postData[post].datetime);
      $("#coverimg").attr("src", postData[post].cover_img);
      $("#post").html(postData[post].post);
      $("#cardimg1").attr("src", postData[post].card_img1);
      $("#cardimg2").attr("src", postData[post].card_img2);
      $("#author").html(postData[post].author);
      $("#authorInfo").html(postData[post].author_info);
    }
  }
}

function fixElementSizes() {
  $("iframe").width('100%');
}

function sharePost() {
  window.plugins.socialsharing.share(postTitle + " - Readmore @ ", null, null, "Exypnos Android App.");
}

function getJsonPostData() {
  return(JSON.parse(localStorage.getItem('postData')));
}