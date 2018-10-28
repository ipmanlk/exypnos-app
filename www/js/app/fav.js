// control favoruties
function favAdd() {
  var favs;
  if (localStorage.getItem('favs') == null) {
    favs = {};
  } else {
    favs = JSON.parse(localStorage.getItem('favs'));
  }

  if (favs[currentPostID] == null) {
    favs[currentPostID] = postsList[currentPostID];
    $('#postFavIcon').removeClass('far fa-star');
    $('#postFavIcon').addClass('fas fa-star');
    showToast("Favorite saved!", "This post can be found in your favorites.","success", 2000);
  } else {
    delete favs[currentPostID];
    $('#postFavIcon').removeClass('fas fa-star');
    $('#postFavIcon').addClass('far fa-star');
    showToast("Favorite removed!", "This post can no longer be found in your favorites.","success", 2000);
  }

  $('#postFavBtn').blur();

  localStorage.setItem('favs', JSON.stringify(favs));

  $("#navFav").show();

  if ((Object.keys(favs)).length < 1) {
    localStorage.removeItem("favs");
    $("#navFav").hide();
  }
}

function showFavs() {
  var favs = JSON.parse(localStorage.getItem('favs'));
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