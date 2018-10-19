// define where are you
var currentPage = "index";

// browse by category or not
var catFilter = false;

$(document).ready(function() {
  $('#navBar').load('navBar.html');
  $("#loader").fadeIn();
  getPosts("0");
  getCats();
});

function getPosts(id,catID='') {
  var url;
  // check if categories are set
  if (catFilter) {
    url = `https://exypnos.navinda.xyz/api/cats.php?id=${id}&cat_id=${catID}`;
  } else {
    url = `https://exypnos.navinda.xyz/api/exy.php?id=${id}`;
  }
  $.ajax({
    type: 'get',
    url: url,
    dataType: 'json',
    timeout: 60000, //60s
    success: function (postData) {
      for (post in postData) {
        appendToPosts(getCard(postData[post]), "end");
      }
      // first time requesting posts
      if (id == 0) {
        localStorage.setItem('postData', JSON.stringify(postData));

      } else {
        if (postData[0] == null) {
          // if there are no more post to load
          $('#loadMorePostsBtn').fadeOut();
        } else {
          // request for more posts
          var oldPostData = getJsonPostData();
          var oldPostDataLength = Object.keys(getJsonPostData()).length;
          for (post in postData) {
            // append new posts to oldPostData object
            oldPostData[oldPostDataLength] = postData[post];
            oldPostDataLength++;
          }
          // save updated object
          localStorage.setItem('postData', JSON.stringify(oldPostData));
        }
      }
      // show posts
      $("#loadMorePostsMsg").hide();
      $("#content").fadeIn();
      $("#loader").hide();
    }
  });
}

function getCard(post) {
  var id,title,coverImg,shortDes,link;
  id = post.post_id;
  title = post.title;
  coverImg = post.cover_img;
  shortDes = post.short_des;
  var html = '<div class="container mt-4"><div class="card text-white bg-dark mb-3" style="max-width: 100%;"><img class="card-img-top" src="' + coverImg + '" alt="Card image cap"><div class="card-body"><h5 class="card-title sinhala"><strong>' + title + '</strong></h5><p class="card-text sinhala">' + shortDes + '</p><a href="#" class="btn btn-primary btn-block" onclick="' + "goToPost('" + id + "')"+ '">Read More</a></div></div></div></div>';
  return(html)
}

function appendToPosts(html,position) {
  if (position == 'end') {
    $("#posts").append(html);
  } else {
    $("#posts").prepend(html);
  }

}

function goToPost(id) {
  window.location = "./post.html?id=" + id;
}

function loadMorePosts() {

  $("#loadMorePostsMsg").fadeIn();

  var postData = getJsonPostData();
  // get object length & -1 to find last item
  var oldestPostId = Object.keys(postData).length -1;
  // get the post id of last item
  oldestPostId = postData[oldestPostId].post_id;
  // if it's not 1, request for more posts

  // if category filter is enabled
  if (catFilter) {
    var selectedCat = postData[0].cat_id;
    getPosts(oldestPostId, selectedCat);
  } else {
    getPosts(oldestPostId);
  }
}

function getJsonPostData() {
  return(JSON.parse(localStorage.getItem('postData')));
}

function loadCat(catID,catName) {
  $('#navBarBtn').click();
  catFilter = true;
  getPosts(0, catID);
  $('#content').fadeOut();
  $('#posts').empty();
  $('#catMsg').show();
  $('#catName').text(catName);
  $('#loadMorePostsBtn').fadeIn();
}