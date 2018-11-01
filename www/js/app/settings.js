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
    "selectors":["*"],
    "classes":["sinhala"]
  },
  "settingJustifyText":{
    "selectors":["*"],
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
  showToast("Settings updated!", "Go back to see your changes.","success", 3000);
}

function restoreData() {
  var suser_code = localStorage.getItem('suser_code');

  // restore favs
  $("#settingRestoreBtn").prop("disabled",true);
  $.ajax({
    type: 'post',
    data: {
      s:"4a2204811369",
      cmd:"fav_g",
      suser_code:suser_code
    },
    url: "https://exypnos.navinda.xyz/api/v2.1/t.php",
    dataType: 'json',
    timeout: 60000, //60s
    success: function (data) {
      localStorage.setItem('favs', JSON.stringify(data));
      $("#settingRestoreBtn").prop("disabled",false);
      showToast("Favorites restored!", "Open favorites to find them.","success", 3000);
    }
  });
}