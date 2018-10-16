// offline check
document.addEventListener("offline", onOffline, false);
function onOffline() {
  alert("You are offline!. Please connect to the Internet!.");
  exitApp();
}

// override back button
document.addEventListener("backbutton", function (e) {
  e.preventDefault();
  if (currentPage !== "index") {
    window.location = "index.html";
  } else {
    exitApp();
  }
}, false);

function exitApp() {
  navigator.app.exitApp();
}