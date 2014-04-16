const { classes: Cc, interfaces: Ci, utils: Cu } = Components;

const ADDON_ID = "optionskitchensink@margaretleibovic.com";

Cu.import("resource://gre/modules/AddonManager.jsm");
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

var testOptions = [
  { 
    value: "value1",
    label: "Value 1"
  },
  { 
    value: "value2",
    label: "Value 2"
  },
  { 
    value: "value3",
    label: "Value 3"
  }
];

function observe(doc, topic, id) {
  if (id != ADDON_ID) {
    return;
  }

  let setting = doc.getElementById("country-setting");
  setting.setAttribute("title", Strings.GetStringFromName("country"));

  let select = doc.getElementById("country-select");
  for (let code in Countries) {
    let option = doc.createElement("option");
    option.value = code;
    option.textContent = Countries[code].label;
    select.appendChild(option);
  }

  select.value = getCountryCode();

  select.addEventListener("change", function() {
    let newCountryCode = select.value;
    Services.prefs.setCharPref(WCF_COUNTRY_CODE_PREF, newCountryCode);
    HomeProvider.requestSync(DATASET_ID, refreshDataset);
  }, false);
}

/**
 * bootstrap.js API
 * https://developer.mozilla.org/en-US/Add-ons/Bootstrapped_extensions
 */
function startup(data, reason) {
  Services.obs.addObserver(observe, AddonManager.OPTIONS_NOTIFICATION_DISPLAYED, false);
}

function shutdown(data, reason) {
  Services.obs.removeObserver(observe, AddonManager.OPTIONS_NOTIFICATION_DISPLAYED);
}

function install(data, reason) {
}

function uninstall(data, reason) {
}
