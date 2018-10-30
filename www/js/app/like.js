var postLiked = false;

function likeGet() {
  // get how much likes current post has
  $.ajax({
    type: 'post',
    data: {
      s:"4a2204811369",
      lke_g:"0",
      post_id:currentPostID
    },
    url: "https://exypnos.navinda.xyz/api/v2.1/t.php",
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

  if (!postLiked) {
    $.ajax({
      type: 'post',
      data: {
        s:"4a2204811369",
        lke_a:"0",
        suser_code:suser_code,
        post_id:currentPostID
      },
      url: "https://exypnos.navinda.xyz/api/v2.1/t.php",
      dataType: 'html',
      timeout: 60000, //60s
      success: function (data) {
        if (data == "1") {
          showToast("Post Liked!", "Thanks for giving your feedback.","success", 2000);
          $('#postLikeIcon').removeClass("far fa-thumbs-up");
          $('#postLikeIcon').addClass("fas fa-thumbs-up");
          $('#postLikes').text(parseInt($('#postLikes').text()) + 1);
        }
      }
    });
  }
  $('#postLikeBtn').blur();
}

function likeCheck() {
  var suser_code = localStorage.getItem('suser_code');
  $.ajax({
    type: 'post',
    data: {
      s:"4a2204811369",
      lke_c:"0",
      suser_code:suser_code,
      post_id:currentPostID
    },
    url: "https://exypnos.navinda.xyz/api/v2.1/t.php",
    dataType: 'html',
    timeout: 60000, //60s
    success: function (data) {
      if (data == "1") {
        $('#postLikeIcon').removeClass("far fa-thumbs-up");
        $('#postLikeIcon').addClass("fas fa-thumbs-up");
        postLiked = true;
      } else {
        postLiked = false;
      }
      // check if in favs
      favCheck();
    }
  });
}