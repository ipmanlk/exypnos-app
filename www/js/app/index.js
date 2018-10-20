// define where are you
var currentPage = "postList";
// global post title for sharing
var postTitle;
// remember last post id to scroll back
var lastPostID;

// browse by category or not
var catFilter = false;

// check if device is ready or not
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  $('#navBar').load('navBar.html');
  $("#loader").fadeIn();
  getPosts("0");
  getCats();
  checkSettings();
}

function getPosts(id,catID) {
  var url;
  // check if categories are set
  if (catFilter) {
    url = 'https://exypnos.navinda.xyz/api/cats.php?id=' + id + '&cat_id=' + catID;
  } else {
    url = 'https://exypnos.navinda.xyz/api/exy.php?id=' + id;
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
      $("#postList").fadeIn();
      $("#loader").hide();

      // apply settings to new posts
      applySettings();
    }
  });
}

function getCard(post) {
  var id,title,coverImg,shortDes,link;
  id = post.post_id;
  title = post.title;
  coverImg = post.cover_img;
  shortDes = post.short_des;
  var html = '<div id="' + id + '" class="container mt-4"><div class="card text-white bg-dark mb-3" style="max-width: 100%;"><img class="card-img-top" src="' + coverImg + '" alt="Card image cap"><div class="card-body"><h5 class="card-title sinhala justify"><strong>' + title + '</strong></h5><p class="card-text sinhala justify">' + shortDes + '</p><a href="#" class="btn btn-primary btn-block" onclick="' + "showPost('" + id + "')"+ '">Read More</a></div></div></div></div>';
  return(html)
}

function appendToPosts(html,position) {
  if (position == 'end') {
    $("#posts").append(html);
  } else {
    $("#posts").prepend(html);
  }

}

function loadMorePosts() {

  $("#loadMorePostsMsg").fadeIn();

  var postData = getJsonPostData();
  // get object length & -1 to find last item
  var oldestPostId = Object.keys(postData).length -1;
  // get the post id of last item
  oldestPostId = postData[oldestPostId].post_id;

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

function showPost(id) {
  currentPage = "Post";
  loadPost(id);
  $('#postList').hide();
  $('#catMsg').hide();
  $('#postContent').fadeIn();
  lastPostID =  "#" + id;
}

function loadPost(id) {
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
  fixElementSizes();
}

function fixElementSizes() {
  $("iframe").width('100%');
}

function sharePost() {
  window.plugins.socialsharing.share(postTitle + " - Readmore @ ", null, null, "Exypnos Android App.");
}

function showPostList() {
  $('#postContent').hide();
  $('#postList').fadeIn();
  $(window).scrollTop(($(lastPostID).offset().top) - 80);
  // if in category
  if (catFilter) {
    $('#catMsg').fadeIn();
  }
}