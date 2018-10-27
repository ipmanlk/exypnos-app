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
}

function showFavs() {
  var favs = JSON.parse(localStorage.getItem('favs'));
  $("#posts").empty();

  for (post in favs) {
    appendToPosts(getCard(favs[post]));
  }

  loadMore = false;

  $('#navBarBtn').click();
}

function favCheck() {
  var favs;
  if (localStorage.getItem('favs') == null) {
    favs = {};
  } else {
    favs = JSON.parse(localStorage.getItem('favs'));
  }

  if (favs[currentPostID].post_id !== null) {
    $('#postFavIcon').removeClass('far fa-star');
    $('#postFavIcon').addClass('fas fa-star');
  }
}