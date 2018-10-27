// control favoruties
function favAdd() {
  var favs;
  if (localStorage.getItem('favs') == null) {
    favs = {};
  } else {
    favs = JSON.parse(localStorage.getItem('favs'));
  }
var suser_code = localStorage.getItem('suser_code');
  if (favs[currentPostID] == null) {
    favs[currentPostID] = postsList[currentPostID];
    $('#postFavIcon').removeClass('far fa-star');
    $('#postFavIcon').addClass('fas fa-star');
    showToast("Favorite saved!", "This post can be found in your favorites.","success", 2000);


    $.ajax({
      type: 'get',
      url: "https://exypnos.navinda.xyz/api/v2/t.php?s=4a2204811369&fav_a=0&suser_code=" + suser_code + "&post_id=" + currentPostID,
      dataType: 'json',
      timeout: 60000, //60s
      success: function (data) {
        if (data == "1") {
          alert("added!");
        }
      }
    });

  } else {
    delete favs[currentPostID];
    $('#postFavIcon').removeClass('fas fa-star');
    $('#postFavIcon').addClass('far fa-star');
    showToast("Favorite removed!", "This post can no longer be found in your favorites.","success", 2000);


    $.ajax({
      type: 'get',
      url: "https://exypnos.navinda.xyz/api/v2/t.php?s=4a2204811369&fav_d=0&suser_code=" + suser_code + "&post_id=" + currentPostID,
      dataType: 'json',
      timeout: 60000, //60s
      success: function (data) {
        if (data == "1") {
          alert("deleted!");
        }
      }
    });
  }

  $('#postFavBtn').blur();

  localStorage.setItem('favs', JSON.stringify(favs));
}

function showFavs() {
  showPostList();

  var favs = JSON.parse(localStorage.getItem('favs'));
  $("#posts").empty();

  for (post in favs) {
    appendToPosts(getCard(favs[post]));
  }

  loadMore = false;

  $('#navBarBtn').click();
  $('#loadMorePostsBtn').hide();
  $('#favMsg').fadeIn();
}

function favCheck() {
  var favs;
  if (localStorage.getItem('favs') == null) {
    favs = {};
  } else {
    favs = JSON.parse(localStorage.getItem('favs'));
  }

  if (currentPostID in favs) {
    $('#postFavIcon').removeClass('far fa-star');
    $('#postFavIcon').addClass('fas fa-star');
  } else {
    $('#postFavIcon').removeClass('fas fa-star');
    $('#postFavIcon').addClass('far fa-star');
  }
}

function favRestore() {
  var suser_code = localStorage.getItem('suser_code');
  $.ajax({
    type: 'get',
    url: "https://exypnos.navinda.xyz/api/v2/t.php?s=4a2204811369&fav_g=0&suser_code=" + suser_code + "&post_id=" + currentPostID,
    dataType: 'json',
    timeout: 60000, //60s
    success: function (data) {
      if (data == "1") {
        showToast("Post Liked!", "Thanks for giving your feedback.","success", 2000);
        $('#postLikeIcon').removeClass("far fa-thumbs-up");
        $('#postLikeIcon').addClass("fas fa-thumbs-up");
        $('#postLikes').text(parseInt($('#postLikes').text()) + 1);
      }
    }
  });
}