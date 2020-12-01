
'use strict';


chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  chrome.storage.sync.get(text, function(items) {
    var value = items[text];
    if (value) {
 
      chrome.omnibox.setDefaultSuggestion(
        {'description' : 'Redirecting you to: ' + value}
      );
    } else {
    
      chrome.omnibox.setDefaultSuggestion(
        {'description' : 'No redirect found.'}
      );
    }
  });
});


chrome.omnibox.onInputEntered.addListener(function(text) {
  chrome.storage.sync.get(text, function(items) {
    var urlVal = items[text];
    console.log('url: ' + urlVal);
    if(urlVal) { 
      chrome.tabs.update({url: urlVal});   
    }
  });
});
