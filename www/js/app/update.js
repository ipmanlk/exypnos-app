function updateCheck() {
  $.ajax({
    type: 'post',
    url: "https://exypnos.navinda.xyz/api/v2.1/t.php",
    data: {
      s:"f6d9248ac046",
      up_c:"0"
    },
    dataType: 'html',
    timeout: 60000, //60s
    success: function (data) {
      if (data !== currentVersion) {
        alert("New version found! (" + data + "). Please update your app as soon as possible!");
      }
    }
  });
}