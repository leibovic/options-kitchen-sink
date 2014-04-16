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

  let select = doc.getElementById("select");
  for (o of testOptions) {
    let option = doc.createElement("option");
    option.value = o.value;
    option.textContent = o.label;
    select.appendChild(option);
  }

  select.addEventListener("change", function() {
    Services.console.logStringMessage("*** test select value changed to: " + select.value);
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
