// control favoruties
function favAdd() {
  var favs = getFavs();
  if (favs[currentPostID] == null) {
    sendFavRequest("favAdd");
  } else {
    sendFavRequest("favDel");
  }

  $('#postFavBtn').blur();
}

function showFavs() {
  var favs = getFavs();
  $("#posts").empty();

  for (post in favs) {
    appendToPosts(getCard(favs[post]));
    applySettings();
  }

  loadMore = false;

  $('#navBarBtn').click();
  $('#loadMorePostsBtn').hide();
  $('#favMsg').fadeIn();

  currentPage = "FavList";
  $('#postContent, #catContent').hide();
  $('#postList').fadeIn();
}

function favCheck() {
  var favs = getFavs();

  if (currentPostID in favs) {
    $('#postFavIcon').removeClass('far fa-star');
    $('#postFavIcon').addClass('fas fa-star');
  } else {
    $('#postFavIcon').removeClass('fas fa-star');
    $('#postFavIcon').addClass('far fa-star');
  }
}

function sendFavRequest(type) {
  var url;
  var cmd;
  switch (type) {
    case "favAdd":
    cmd = "fav_a"
    break;
    case "favDel":
    cmd = "fav_d"
    break;
  }

  var suser_code = localStorage.getItem('suser_code');

  $.ajax({
    type: 'post',
    data: {
      s:"f6d9248ac046",
      cmd:cmd,
      suser_code:suser_code,
      post_id:currentPostID
    },
    url: "https://exypnos.navinda.xyz/api/v2.1/t.php",
    dataType: 'html',
    timeout: 60000, //60s
    success: function (data) {
      if (data == "1") {
        handleFavOutput(type);
      }
    }
  });
}

function handleFavOutput(type) {
  // get favs
  var favs = getFavs();

  // do relevent action
  switch (type) {
    case "favAdd":
    favs[currentPostID] = postsList[currentPostID];
    $('#postFavIcon').removeClass('far fa-star');
    $('#postFavIcon').addClass('fas fa-star');
    showToast("Favorite saved!", "This post can be found in your favorites.","success", 2000);
    break;
    case "favDel":
    delete favs[currentPostID];
    $('#postFavIcon').removeClass('fas fa-star');
    $('#postFavIcon').addClass('far fa-star');
    showToast("Favorite removed!", "This post can no longer be found in your favorites.","success", 2000);
    break;
  }

  // hide of show nav on menu modal
  $("#navFav").show();

  // save changes
  localStorage.setItem('favs', JSON.stringify(favs));

  // remove favs if there are none
  if ((Object.keys(favs)).length < 1) {
    localStorage.removeItem("favs");
    $("#navFav").hide();
  }
}

function getFavs() {
  var favs;
  if (localStorage.getItem('favs') == null) {
    favs = {};
  } else {
    favs = JSON.parse(localStorage.getItem('favs'));
  }
  return (favs);
}