function checkSettings() {
  if (localStorage.getItem('settings') == null) {
    setDefaultSettings();
  } else {
    applySettings();
  }
}

function setDefaultSettings() {
  var settings = {
    "useSystemFont": false,
    "notification": false,
    "justifyText": true
  }
  localStorage.setItem('settings', JSON.stringify(settings));
}

function applySettings() {
  var settings = JSON.parse(localStorage.getItem('settings'));
  if (settings['useSystemFont']) {
    $('#postBody').removeClass('sinhala');
    $('.card-title').removeClass('sinhala');
    $('.card-text').removeClass('sinhala');

  } else if (settings['notification']) {
    // todo: code notifications
    
  } else if (settings['justifyText'] == false) {
    $('#postBody').removeClass('justify');
    $('.card-title').removeClass('justify');
    $('.card-text').removeClass('justify');
  }

}