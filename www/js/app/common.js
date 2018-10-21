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
    showPostList();
    break;
    case "Category":
    window.location = "index.html";
    break;
    default:
    exitApp();
  }
}, false);

function exitApp() {
  navigator.app.exitApp();
}

// copy paste disable
function disableCopy() {
  //Disable cut copy paste
  $('body').on('cut copy paste', function (e) {
      e.preventDefault();
  });

  //Disable mouse right click
  $("body").on("contextmenu",function(e){
      return false;
  });
}