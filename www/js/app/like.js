function likeGet() {
  // get how much likes current post has
  $.ajax({
    type: 'get',
    url: "https://exypnos.navinda.xyz/api/t.php?s=4a2204811369&lke_g=0&post_id=" + currentPostID,
    dataType: 'json',
    timeout: 60000, //60s
    success: function (data) {
      $('#postLikes').text(data['post_likes']);
      likeCheck();
    }
  });
}

function likeAdd() {
  var suser_code = localStorage.getItem('suser_code');
  $.ajax({
    type: 'get',
    url: "https://exypnos.navinda.xyz/api/t.php?s=4a2204811369&lke_a=0&suser_code=" + suser_code + "&post_id=" + currentPostID,
    dataType: 'html',
    timeout: 60000, //60s
    success: function (data) {
      if (data == "1") {
        showToast("Post Liked!", "Thanks for giving your feedback.","success", 2000);
        $('#postLikeIcon').removeClass("far fa-thumbs-up");
        $('#postLikeIcon').addClass("fas fa-thumbs-up");
      }
    }
  });
}

function likeCheck() {
  var suser_code = localStorage.getItem('suser_code');
  $.ajax({
    type: 'get',
    url: "https://exypnos.navinda.xyz/api/t.php?s=4a2204811369&lke_c=0&suser_code=" + suser_code + "&post_id=" + currentPostID,
    dataType: 'html',
    timeout: 60000, //60s
    success: function (data) {
      if (data == "1") {
        $('#postLikeIcon').removeClass("far fa-thumbs-up");
        $('#postLikeIcon').addClass("fas fa-thumbs-up");
        $('#postLikeBtn').prop("disabled",true);
      } else {
        $('#postLikeBtn').prop("disabled",false);
      }
    }
  });
}