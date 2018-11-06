// define current version
var currentVersion = "v2.0.3";

// check if device is ready or not
document.addEventListener("deviceready", onDeviceReady, false);

// override back button
document.addEventListener("backbutton", function (e) {
  e.preventDefault();
  switch (currentPage) {
    case "Settings":
    window.location = "index.html";
    break;
    case "About":
    window.location = "index.html";
    break;
    case "Post":
    currentPage = "postList";
    if (localStorage.getItem('favs') !== null) {
      var favs = JSON.parse(localStorage.getItem('favs'));
      if (currentPostID in favs) {
        currentPage = "FavList";
      }
    }
    showPostList();
    break;
    case "CategoryList":
    currentPage = "postList";
    showPostList();
    break;
    case "Category":
    window.location = "index.html";
    break;
    case "FavList":
    window.location = "index.html";
    break;
    default:
    if (confirm("Do you really want to exit?")) {
      exitApp();
    }
  }
}, false);

function exitApp() {
  navigator.app.exitApp();
}

// copy paste disable
function disableCopy() {
  if (currentPage !== "Settings") {
    //Disable cut copy paste
    $('body').on('cut copy paste', function (e) {
      e.preventDefault();
    });

    //Disable mouse right click
    $("body").on("contextmenu",function(e){
      return false;
    });
  }
}

// toast functions
function showToast(title, msg, type, hideTime) {
  $.toast({
    text: msg,
    heading: title,
    icon: type, //warning, success, error, info
    showHideTransition: 'slide',
    allowToastClose: false,
    hideAfter: hideTime,
    stack: false,
    position: 'bottom-center',
    textAlign: 'left',
    loader: true,
    loaderBg: '#FFFFFF'
  });
}

function hideToast() {
  $.toast().reset('all');
}

// hide unwanted buttons on settings & about pages
function hideUselessBtns() {
  $("#navCat").attr("class","hide");
  $("#navFav").attr("class","hide");
  disableCopy();
}

// load navbar using ajax
function loadNavBar() {
  $('#navBar').load('navBar.html');
  $('#navModal').load('navModal.html');
}