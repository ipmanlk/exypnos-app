function loadCat(catID,catName) {
  $('#navBarBtn').click();
  catFilter = true;
  getPosts(0, catID);
  $('#content').fadeOut();
  $('#posts').empty();
  $('#catMsg').show();
  $('#catName').text(catName);
  $('#loadMorePostsBtn').fadeIn();
  currentPage = "Category";
}

// get categories
function getCats() {
  $.ajax({
    type: 'get',
    url: 'https://exypnos.navinda.xyz/api/s.php?s=4a2204811369&sp=0',
    dataType: 'json',
    timeout: 60000, //60s
    success: function (catsData) {
      for (i in catsData) {
        $('#cats').append('<a onclick="loadCat(' + "'" + catsData[i].cat_id + "'" + ",'" + catsData[i].name + "'" + ');" class="dropdown-item" href="#">&nbsp;<i class="fa fa-angle-double-right"></i>&nbsp;' + catsData[i].name + '</a>');
        // loat to category object
        cats[catsData[i].cat_id] = catsData[i].name;
      }
    }
  });
}