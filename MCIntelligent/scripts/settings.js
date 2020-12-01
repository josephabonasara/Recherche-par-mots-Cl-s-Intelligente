
'use strict';
var dict= new Object();
var commonFunctions = window.commonFunctions;

var nonusableKeys = new Set(["clear", "getItem", "key", "length", "removeItem", "setItem"]);



var addRemoveListeners = function addRemoveListeners() {
  var removers = document.getElementsByClassName('removeElement');
  for (var i = 0; i < removers.length; i++) {
    var element = removers[i];
    element.addEventListener('click', function(item) {
      removeRedirect(this);
    });
  }
};
var addListeners = function addListeners() {
  var links = document.getElementsByClassName('gotoLink');
  for (var j = 0; j < links.length; j++) {
    var el = links[j];
    el.addEventListener('click', function(item) {
      gotoLink(this);
    });
  }
};




var populateRedirects = function populateRedirects() {

  var table = document.getElementById('mainTables');
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
  
 
  chrome.storage.sync.get(null, function(items) {
    for (var key in items) {

     
      if (nonusableKeys.has(key)) {
        continue;
      }
   
      if (items.hasOwnProperty(key) && !commonFunctions.isPrivateKey(key)) {
       
        var row = table.insertRow(-1);

        
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        
        cell1.innerHTML = key;
      
        cell2.innerHTML = items[key];

        dict[key]= items[key];
        
      
        cell3.innerHTML = '<button id="' + key +'" class="removeElement btn btn-primary btn-sm" >Remove</button>';
        cell4.innerHTML = '<button id="' + key+'" class="gotoLink btn btn-primary btn-sm" >Go to URL</button>';
      }

    }

    addRemoveListeners();
    addListeners();
  });
};


window.onload = function() {
  populateRedirects();
};


var removeRedirect = function removeRedirect(button) {  
  var key = button.id;
  console.log('Deleting ' + button.id); 
  chrome.storage.sync.remove(button.id);
  populateRedirects();
};
var gotoLink = function gotoLink(button) {  
  var key2 = button.id;
  console.log('Going to link ' + button.id); 
  
 
 window.open(dict[key2],"_blank");
};


