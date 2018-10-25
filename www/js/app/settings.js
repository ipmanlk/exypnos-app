// element id's in settings page & their related setting (for checkboxes)
var elementSetting = {
  "settingCustomFont":"settingCustomFont",
  "settingNotification":"settingNotification",
  "settingJustifyText":"settingJustifyText",
  "settingAutoLoad":"settingAutoLoad"
}

// settings with effected selectors & css classes
var settingInfo = {
  "settingCustomFont":{
    "selectors":["#postBody","#cardTitle","#cardText"],
    "classes":["sinhala"]
  },
  "settingJustifyText":{
    "selectors":["#postBody","#cardTitle","#cardText"],
    "classes":["justify"]
  }
}

function checkSettings() {
  if (localStorage.getItem('settings') == null) {
    setDefaultSettings();
  } else {
    var settings = JSON.parse(localStorage.getItem('settings'));
    if (settings['settingAutoLoad'] == null) {
      // prevent conflicts with previous versions of app
      setDefaultSettings();
    } else {
      applySettings();
    }
  }
}

function setDefaultSettings() {
  var settings = {
    "settingCustomFont": true,
    "settingNotification": false,
    "settingJustifyText": true,
    "settingAutoLoad": true
  }
  localStorage.setItem('settings', JSON.stringify(settings));
}

function applySettings() {
  var settings = JSON.parse(localStorage.getItem('settings'));

  if (!settings['settingCustomFont']) {
    classRemover(settingInfo['settingCustomFont']);
  }

  if (!settings['settingJustifyText']) {
    classRemover(settingInfo['settingJustifyText']);
  }

  if (!settings['settingAutoLoad']) {
    loadMore = "disabled";
  } else {
    $('#loadMorePostsBtn').hide();
  }
}

function classRemover(obj) {
  var selectors = obj['selectors'];
  var classes = obj['classes'];
  for (s in selectors) {
    for (c in classes) {
      $(selectors[s]).removeClass(classes[c]);
    }
  }
}

function updateSettingsUI() {
  var settings = JSON.parse(localStorage.getItem('settings'));

  for (elementID in elementSetting) {
    // get setting releated to element id
    var setting = settings[(elementSetting[elementID])];
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
  var setting = elementSetting[elementID];
  settings[setting] = value;
  localStorage.setItem('settings', JSON.stringify(settings));
  updateSettingsUI();
}