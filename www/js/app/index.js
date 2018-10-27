// define where are you
var currentPage = "postList";
// global post id for sharing, like, fav
var currentPostID;
// remember last post id to scroll back
var lastPostID;

// browse by category or not
var catFilter = false;

// control variable for autoload Posts
var loadMore = true;

var isOffline = false;

// check if device is ready or not
document.addEventListener("deviceready", onDeviceReady, false);

// store categories & posts
var cats = {};
var postsList = {};
var posts = {};

function onDeviceReady() {
  $('#navBar').load('navBar.html');
  $('#navModal').load('navModal.html');
  checkUser();
  checkSettings();
  disableCopy();
}

function getPosts(id,catID) {
  showToast("Loading posts...", "Please be patient!", "info", 20000);
  var url;
  // check if categories are set
  if (catFilter) {
    url = 'https://exypnos.navinda.xyz/api/v2/t.php?s=4a2204811369&p_list=0&id=' + id + '&cat_id=' + catID;
  } else {
    url = 'https://exypnos.navinda.xyz/api/v2/t.php?s=4a2204811369&p_list=0&id=' + id;
  }
  $.ajax({
    type: 'get',
    url: url,
    dataType: 'json',
    timeout: 60000, //60s
    success: function (postData) {
      for (post in postData) {
        // load to posts object
        postsList[(postData[post].post_id)] = postData[post];
        appendToPosts(getCard(postData[post]), "end");
      }

      if (postData[0] == null) {
        // if there are no more post to load
        $('#loadMorePostsBtn').fadeOut();

        // disable load more
        loadMore = false;
      } else {
        // enable load more
        loadMore = true;

        if (catFilter) {
          $('#catMsg').fadeIn();
        }
      }

      // show posts
      $("#postList").fadeIn();

      // apply settings to new posts
      applySettings();

      // hideToast
      hideToast();
    }
  });
}

function getCard(post) {
  var id,title,coverImg,shortDes,link, cat_id, datetime;
  id = post.post_id;
  title = post.title;
  coverImg = post.cover_img;
  shortDes = post.short_des;
  cat_id = post.cat_id;
  datetime = post.datetime;
  author = post.author;
  var html = '<div id="' + id + '" class="container mt-4"><div class="card text-white bg-dark mb-3 card-full-width"><span class="badge badge-dark">' + cats[cat_id] + '</span><img class="card-img-top" src="' + coverImg + '" alt="Top Card Img"><span class="badge badge-secondary">' + "By " + author + " @ " + datetime + '</span><div class="card-body"><h5 id="cardTitle" class="card-title sinhala justify"><strong>' + title + '</strong></h5><p id="cardText" class="card-text sinhala justify">' + shortDes + '</p><a href="#" class="btn btn-primary btn-block" onclick="' + "showPost('" + id + "')"+ '">Read More</a></div></div></div></div>';
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
  // disable load more until request complete
  loadMore = false;

  // get keys from posts object
  var keys = Object.keys(postsList);

  // get the post id of last item
  var oldestPostId = keys[0];

  // if category filter is enabled
  if (catFilter) {
    var selectedCat = postList[oldestPostId].cat_id;
    getPosts(oldestPostId, selectedCat);
  } else {
    getPosts(oldestPostId);
  }
}

function showPost(id) {
  showToast("Loading post....", "Please be patient!", "info", 20000);
  currentPage = "Post";
  loadPost(id);
  lastPostID =  "#" + id;
}

function loadPost(id) {
  currentPostID = id;
  if (posts[id] == null) {
    loadPostOnline(id);
  } else {
    setPostContent(id, posts[id]);
    // check post likes
    likeGet();
    // show post
    $('#postList, #catMsg').hide();
    $('#postContent').fadeIn();
    // hide toast
    hideToast();
  }
}

function loadPostOnline(id) {
  $.ajax({
    type: 'get',
    url: "https://exypnos.navinda.xyz/api/v2/t.php?s=4a2204811369&p_get=0&id=" + id,
    dataType: 'json',
    timeout: 60000, //60s
    success: function (data) {
      // store post data for later
      posts[data.post_id] = data;
      // set element values
      setPostContent(id, data);
      // check post likes
      likeGet();
      // show post
      $('#postList, #catMsg').hide();
      $('#postContent').fadeIn();
      // hide toast
      hideToast();
    }
  });
}

function setPostContent(id, data) {
  $("#title").html(postsList[id].title);
  $("#datatime").html(postsList[id].datetime);
  $("#coverimg").attr("src", postsList[id].cover_img);
  $("#post").html(data.post);
  $("#cardimg1").attr("src", data.card_img1);
  $("#cardimg2").attr("src", data.card_img2);
  $("#author").html(postsList[id].author);
  $("#authorInfo").html(data.author_info);
  fixElementSizes();
}

function fixElementSizes() {
  $("iframe").width('100%');
}

function sharePost() {
  var postTitle = postsList[currentPostID].title;
  window.plugins.socialsharing.share(postTitle + " - Readmore @ ", null, null, "Exypnos in Google Play! - https://tinyurl.com/exypnos");
}

function showPostList() {
  currentPage = "postList";
  $('#postContent, #catContent').hide();
  $('#postList').fadeIn();
  $(window).scrollTop(($(lastPostID).offset().top) - 80);
  // if in category
  if (catFilter) {
    $('#catMsg').fadeIn();
  }
}

function showCats() {
  loadMore = false;
  $('#navBarBtn').click();
  $('#postContent, #postList, #catMsg, #favMsg').hide();
  $('#catContent').fadeIn();
  currentPage = "CategoryList";
}

function loadCat(catID,catName) {
  showToast("Loading posts about " + catName, "Please be patient!", "info", 20000);
  loadMore = true;
  postsList = {};
  catFilter = true;
  getPosts(0, catID);
  $('#postContent, #catContent').hide();
  $('#catName').text(catName);
  $('#posts').empty();
  $('#loadMorePostsBtn').fadeIn();
  currentPage = "Category";
}

// get categories
function getCats() {
  showToast("Loading Categories....", "Please be patient!", "info", 20000);
  $.ajax({
    type: 'get',
    url: 'https://exypnos.navinda.xyz/api/v2/t.php?s=4a2204811369&c_list=0',
    dataType: 'json',
    timeout: 60000, //60s
    success: function (catsData) {
      for (i in catsData) {

        $('#catList').append('<a class="list-group-item active text-white" onclick="' + "loadCat('" + catsData[i].cat_id + "','" + catsData[i].name + "');" + '">' + catsData[i].name + '<span class="badge badge-primary float-right mt-2">' + catsData[i].post_num + '</span></a>');

        // load to category object
        cats[catsData[i].cat_id] = catsData[i].name;
      }

      // load Posts
      getPosts("0");
    }
  });
}


function checkUser() {
  if (localStorage.getItem('suser_code') == null) {
    registerUser();
  } else {
    getCats();
  }
}

function registerUser() {
  var uuid = device.uuid;
  var uuidCode = (SHA1(uuid)).substring(0, 20);
  $.ajax({
    type: 'get',
    url: 'https://exypnos.navinda.xyz/api/v2/t.php?s=4a2204811369&r=' + uuidCode,
    dataType: 'html',
    timeout: 60000, //60s
    success: function (msg) {
      localStorage.setItem('suser_code', msg);
      getCats();
    }
  });
}

// offline check
document.addEventListener("offline", onOffline, false);
function onOffline() {
  if (localStorage.getItem('suser_code') == null) {exitApp()}
  showToast("You are offline!", "Some assets will not load properly","error", 8000);
  isOffline = true;
}

// online check
document.addEventListener("online", onOnline, false);
function onOnline() {
  showToast("You are back online!", "Hooray!","success", 8000);
  if ((cats[1] == null) && isOffline) {
    checkUser();
    isOffline = false;
  }
}

// detect scroll
$(window).scroll(function () {
  if ($(document).height()-100 <= $(window).scrollTop() + $(window).height()) {
    if (loadMore !== "disabled" && loadMore == true && currentPage=="postList") {
      loadMorePosts();
    }
  }
});
