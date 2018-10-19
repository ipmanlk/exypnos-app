// offline check
document.addEventListener("offline", onOffline, false);
function onOffline() {
  alert("You are offline!. Please connect to the Internet!.");
  exitApp();
}

// override back button
document.addEventListener("backbutton", function (e) {
  e.preventDefault();
  if (currentPage !== "postList") {
    currentPage = "postList";
    showPostList();
  } else {
    exitApp();
  }
}, false);

function exitApp() {
  navigator.app.exitApp();
}

function showPostList() {
  $('#postContent').hide();
  $('#postList').fadeIn();
  $(window).scrollTop(($(lastPostID).offset().top) - 80);
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

// get categories
function getCats() {
  $.ajax({
    type: 'get',
    url: 'https://exypnos.navinda.xyz/api/getCats.php',
    dataType: 'json',
    timeout: 60000, //60s
    success: function (catsData) {
      for (i in catsData) {
        $('#cats').append(`<a onclick="loadCat('${catsData[i].cat_id}','${catsData[i].name}');" class="dropdown-item" href="#">&nbsp;<i class="fa fa-angle-double-right"></i>&nbsp;${catsData[i].name}</a>`);
      }
    }
  });
}