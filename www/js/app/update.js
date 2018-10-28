function updateCheck() {
  $.ajax({
    type: 'get',
    url: "https://exypnos.navinda.xyz/api/v2/t.php?s=4a2204811369&up_c=0",
    dataType: 'html',
    timeout: 60000, //60s
    success: function (data) {
      if (data !== currentVersion) {
        alert("New version found! (" + data + "). Please update your app as soon as possible!");
      }
    }
  });
}