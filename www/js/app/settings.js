function checkSettings() {
  if (localStorage.getItem('settings') == null) {
    setDefaultSettings();
  } else {
    applySettings();
  }
}

function setDefaultSettings() {
  var settings = {
    "useCustomFont": true,
    "notification": false,
    "justifyText": true
  }
  localStorage.setItem('settings', JSON.stringify(settings));
}

function applySettings() {
  var settings = JSON.parse(localStorage.getItem('settings'));
  if (!settings['useCustomFont']) {
    $('#postBody').removeClass('sinhala');
    $('.card-title').removeClass('sinhala');
    $('.card-text').removeClass('sinhala');

  }

  if (!settings['justifyText']) {
    $('#postBody').removeClass('justify');
    $('.card-title').removeClass('justify');
    $('.card-text').removeClass('justify');
  }
}

function updateSettingsUI() {
  var settings = JSON.parse(localStorage.getItem('settings'));
  var elementIDs = ['#settingSystemFont', '#settingNotification', '#settingJustifyText'];
  var count = 0;

  // update element props
  for (item in settings) {
    if (settings[item]) {
      $(elementIDs[count]).prop('checked', true);
    }
    count++;
  }

}

function onChangeHandler(element) {
  var elementID = $(element).attr('id');
  var value = false;

  elementSettings = {
    "settingSystemFont":"useCustomFont",
    "settingNotification":"notification",
    "settingJustifyText":"justifyText"
  }

  if($(element).is(":checked")) {
    value = true;
  }

  // call handle setting
  handleSettings(elementSettings[elementID], value);
}

function handleSettings(setting, value) {
  var settings = JSON.parse(localStorage.getItem('settings'));
  settings[setting] = value;
  localStorage.setItem('settings', JSON.stringify(settings));
  updateSettingsUI();
}