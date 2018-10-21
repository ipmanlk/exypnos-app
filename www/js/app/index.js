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

// store categories & posts
var cats = {};
var posts = {};

function onDeviceReady() {
  $('#navBar').load('navBar.html');
  $("#loader").fadeIn();
  getCats();
  checkSettings();
  disableCopy();
}

function getPosts(id,catID) {
  var url;

  // check if categories are set
  if (catFilter) {
    url = 'https://exypnos.navinda.xyz/api/s.php?s=4a2204811369&id=' + id + '&cat_id=' + catID;
  } else {
    url = 'https://exypnos.navinda.xyz/api/s.php?s=4a2204811369&id=' + id;
  }
  $.ajax({
    type: 'get',
    url: url,
    dataType: 'json',
    timeout: 60000, //60s
    success: function (postData) {
      for (post in postData) {
        // load to posts object
        posts[(postData[post].post_id)] = postData[post];
        appendToPosts(getCard(postData[post]), "end");
      }

      if (postData[0] == null) {
        // if there are no more post to load
        $('#loadMorePostsBtn').fadeOut();

        if (catFilter) {
          $('#noPostMsg').fadeIn();
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
  var id,title,coverImg,shortDes,link, cat_id, datetime;
  id = post.post_id;
  title = post.title;
  coverImg = post.cover_img;
  shortDes = post.short_des;
  cat_id = post.cat_id;
  datetime = post.datetime;
  author = post.author;
  var html = '<div id="' + id + '" class="container mt-4"><div class="card text-white bg-dark mb-3" style="max-width: 100%;"><span class="badge badge-dark" style="border-radius: 3px 3px 0px 0px;">' + cats[cat_id] + '</span><img class="card-img-top" style="border-radius:0px 0px" src="' + coverImg + '" alt="Card image cap"><span class="badge badge-secondary" style="border-radius: 0px;">' + "By " + author + " @ " + datetime + '</span><div class="card-body"><h5 class="card-title sinhala justify"><strong>' + title + '</strong></h5><p class="card-text sinhala justify">' + shortDes + '</p><a href="#" class="btn btn-primary btn-block" onclick="' + "showPost('" + id + "')"+ '">Read More</a></div></div></div></div>';
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

  // get keys from posts object
  var keys = Object.keys(posts);
  // sort keys
  keys.sort();
  // get the post id of last item
  var oldestPostId = posts[(keys[0])].post_id;

  // if category filter is enabled
  if (catFilter) {
    var selectedCat = posts[oldestPostId].cat_id;
    getPosts(oldestPostId, selectedCat);
  } else {
    getPosts(oldestPostId);
  }
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
  var postData = posts[id];
  $("#title").html(postData.title);
  postTitle = postData.title;
  $("#datatime").html(postData.datetime);
  $("#coverimg").attr("src", postData.cover_img);
  $("#post").html(postData.post);
  $("#cardimg1").attr("src", postData.card_img1);
  $("#cardimg2").attr("src", postData.card_img2);
  $("#author").html(postData.author);
  $("#authorInfo").html(postData.author_info);
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

function loadCat(catID,catName) {
  $('#navBarBtn').click();
  catFilter = true;
  getPosts(0, catID);
  $('#postContent').hide();
  $('#noPostMsg').hide();
  $('#posts').empty();
  $('#catMsg').fadeIn();
  $('#catName').text(catName);
  $('#loadMorePostsBtn').fadeIn();
  currentPage = "Category";
}

// get categories
function getCats() {
  $.ajax({
    type: 'get',
    url: 'https://exypnos.navinda.xyz/api/s.php?s=4a2204811369&sp=0',
    dataType: 'json',
    timeout: 60000, //60s
    success: function (catsData) {
      for (i in catsData) {
        $('#cats').append('<a onclick="loadCat(' + "'" + catsData[i].cat_id + "'" + ",'" + catsData[i].name + "'" + ');" class="dropdown-item" href="#">&nbsp;<i class="fa fa-angle-double-right"></i>&nbsp;' + catsData[i].name + '</a>');
        // loat to category object
        cats[catsData[i].cat_id] = catsData[i].name;
      }

      // load Posts
      getPosts("0");
    }
  });
}
