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
  } else {
    delete favs[currentPostID];
  }

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