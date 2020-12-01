
'use strict';

var scoped = function() {

  
  var VERSION = '1.3.1';
 
  var VERSION_KEY = '_version';

 
  var ERROR_FLAG = -1;

  var MSG_SAVE_FAIL = 'ERROR pas sauvegardé: ';
  var MSG_SAVE_SUCCESS = 'Mot-clé et Site Web Sauvegardé!<br>';
  var MSG_BAD_KEY = 'Mot-clé devrait avoir au moin 1 charactère.';

 
  var pub = {};
  pub.version = VERSION;
  pub.errorFlag = ERROR_FLAG;

   
  pub.isValidKey = function isValidKey(str){
    if (!str) {
      
      return false;
    }
    return true;
  };

  pub.saveDataGuarantee = function saveDataGuarantee() {
    document.getElementById('overwriteDiv').style.display = 'none';
    var key = document.getElementById('inputval').value;
    if (typeof(currentTab) !== 'undefined') {
      pub.saveRedirect(key, currentTab);
    } else {
      pub.createRedirectSettings('guarentee');
    }
  };


  pub.createRedirectSettings = function createRedirectSettings(guarentee) {
    var givenKey = document.getElementById('inputval').value;
    var redirect = document.getElementById('url').value;

    chrome.extension.getBackgroundPage().console.log(redirect);

    if (!pub.isValidKey(givenKey)) {
      pub.alertIsInvalidKey();
      return;
    }

  
    if (!redirect.includes('chrome://') &&
        !redirect.includes('chrome-extension') &&
          !/^http[s]?:\/\//.test(redirect)) {
          redirect = 'http://'.concat(redirect);
        }
        if (guarentee === "guarentee") {
          pub.saveRedirect(givenKey, redirect, populateRedirects);
        } else {
          pub.checkKeyAndSave(givenKey, redirect, populateRedirects);
        }
  };

  pub.cancel = function cancel() {
    document.getElementById('overwriteDiv').style.display = 'none';
  };

  pub.showReconfirmationMessage = function showReconfirmationMessage(key, value) {
    document.getElementById('priors').style.display = 'none';
    document.getElementById('formDiv').style.display = 'none';
    document.getElementById('overwriteDiv').style.display = 'inherit';
    var messg = key + ' → ' + value;
    document.getElementById('msgOverwrite').textContent = messg;
    document.getElementById('inputval').value = key;
  };

  pub.alertIsInvalidKey = function alertIsInvalidKey() {
    pub.setMessage(MSG_BAD_KEY);
  };

  pub.showReconfirmationMessage = function showReconfirmationMessage(key, value) { 
    document.getElementById('overwriteDiv').style.display = 'inherit';
    var messg = key + ' → ' + value;
    document.getElementById('msgOverwrite').textContent = messg;
  };

  pub.checkKeyAndSave = function checkKeyAndSave(key, currentTab, success) { 
    var exists = false;
    var value = '';
    chrome.storage.sync.get(key, function(items) {
      for (key in items) { 
        exists = true;
        value = items[key];
      }

     
      if (exists) { 
        pub.showReconfirmationMessage(key, value);   
      } else {
        pub.saveRedirect(key, currentTab, success);
      }
    });
  };

 
  pub.setMessage = function setMessage(msg) {
    var confirmationElId = '_confirmation';
    if (!msg) {
      console.log('untruthy str passed to setMessage: ' + msg);
      return;
    }
    document.getElementById('_confirmation').innerHTML = msg;
  };


  pub.saveRedirect = function saveRedirect(key, value, success) {
    var keyValue = {};
    keyValue[key] = value;
    chrome.storage.sync.set(keyValue, function() {
      if (chrome.runtime.lastError) {
    
        pub.setMessage(MSG_SAVE_FAIL + chrome.runtime.lastError);
      } else {
        pub.setMessage(MSG_SAVE_SUCCESS + key + ' → ' + value);
        var noRedirect = document.getElementById('_noRedirects'); 
        if (noRedirect ) { 
          noRedirect.style.display = 'none';
        }
        document.getElementById('overwriteDiv').style.display = 'none';

        if (success) {
       
          success();
        }
      }
    });

    var priors = document.getElementById('priors'); 
    if (priors) { 
      priors.innerHTML = '';
    }
  };

  pub.getSavedVersion = function getSavedVersion(callback) {
    if (!callback) {
     
      console.log('A callback function must be passed to getSavedVersion');
      return;
    }
    chrome.storage.sync.get(VERSION_KEY, function(items) {
      if (chrome.runtime.lastError) {
     
        callback(pub.errorFlag, chrome.runtime.lastError);
        return;
      }
      if (items.hasOwnProperty(VERSION_KEY)) {
        
        callback(items[VERSION_KEY]);
      } else {
       
        callback(null);
      }
    });
  };

 
  pub.isPrivateKey = function isPrivateKey(key) {
    if (key) {
     
      return key.startsWith('_');
    } else {
      console.log('key passed to isPrivateKey() was not truthy: ' + key);
      return false;
    }
  };

    
  function upgrade() {
    pub.getSavedVersion(function(version, errMsg) {
      if (version === pub.errorFlag) {
        console.log('An error occurred during upgrade attempt: ' + errMsg);
        return;
      }
      if (version === null) {
        
        var keyValues = {};
        for (var key in localStorage) {
          keyValues[key] = localStorage[key];
        }
       
        chrome.storage.sync.set(keyValues, function() {
          if (chrome.runtime.lastError) {
            console.log('Error occurred during upgrade attempt. ' +
                        'Upgrade was not completed: ' +
                        chrome.runtime.lastError);
          } else {
            var versionInfo = {};
            versionInfo[VERSION_KEY] = pub.version;
            chrome.storage.sync.set(versionInfo, function() {
              if (chrome.runtime.lastError) {
                console.log('Version could not be written to storage: ' +
                            chrome.runtime.lastError);
              } else {
                console.log('Upgraded to ' + pub.version + '!');
              }
            });
          }
        });
      }
    });
  }

 
  upgrade();

  return pub;
};

window.commonFunctions = scoped();
