// element id's & their related setting
var elementSettings = {
  "settingSystemFont":"useCustomFont",
  "settingNotification":"notification",
  "settingJustifyText":"justifyText"
}

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

  for (elementID in elementSettings) {
    // get setting releated to element id
    var setting = settings[(elementSettings[elementID])];
    // if it's true
    if (setting) {
      $(('#' + elementID)).prop('checked', true);
    }
  }

}

function onChangeHandler(element) {
  var elementID = $(element).attr('id');
  var value = false;

  if($(element).is(":checked")) {
    value = true;
  }

  // call handle setting
  handleSettings(elementID, value);
}

function handleSettings(elementID, value) {
  var settings = JSON.parse(localStorage.getItem('settings'));
  var setting = elementSettings[elementID];
  settings[setting] = value;
  localStorage.setItem('settings', JSON.stringify(settings));
  updateSettingsUI();
}