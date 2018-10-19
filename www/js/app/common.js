// offline check
document.addEventListener("offline", onOffline, false);
function onOffline() {
  alert("You are offline!. Please connect to the Internet!.");
  exitApp();
}

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