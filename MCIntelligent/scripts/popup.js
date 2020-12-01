
'use strict';


var currentTab;




var saveData = function saveData() {
  var key = document.getElementById('inputval').value;
  if (!commonFunctions.isValidKey(key)) {
    commonFunctions.alertIsInvalidKey();
    return;
  }
  console.log(key);
  commonFunctions.checkKeyAndSave(key, currentTab);
};


chrome.tabs.getSelected(null, function(tab) {
  currentTab = tab.url;
});


var openSettings = function() {
  chrome.tabs.create({
    url: 'settings.html'
  });
};




var showCurrentLinks= function showCurrentLinks() { 
  var hasKeys = false;
  var ul = document.getElementById('Mots-Clés -> Urls presentez');

  chrome.storage.sync.get(null, function(items) {
    for (var key in items) {
   
      if (items.hasOwnProperty(key) && !commonFunctions.isPrivateKey(key)) {
        if (currentTab === items[key]) {
          hasKeys = true;
          var elem = document.createElement('li');
          elem.innerHTML = key;

          ul.appendChild(elem);

          var msg = "Mot clé pour ce url:";
          document.getElementById('_redirectsMsg').textContent = msg;
        }
      }
    } 
    showMsg(hasKeys);
  });
};


document.querySelector('#submit').addEventListener('click', saveData);
document.querySelector('#settings').addEventListener('click', openSettings);
document.querySelector('#overwrite').addEventListener('click', commonFunctions.saveDataGuarantee);
document.querySelector('#cancel').addEventListener('click', commonFunctions.cancel);



setTimeout(function foo() {
  document.getElementById('inputval').focus();
}, 100);


window.onload = function() {
  showCurrentLinks();
  
};
