// localStorage.removeItem('registered');

  var addb = function() {
    document.getElementById("content").innerText = "preparing file...";
    chrome.history.search(
      {
        text: "",
        // 'maxResults': 100,
        maxResults: 1,
        startTime: 0
      },
      function(res) {
        window.res = res;

        var i=0; 
        text = JSON.stringify(res[i]);
      //  if (i !== res.length - 1) text = text + ",";
        
        runPyScript("keyword",text);    
     
  })

  //come back here and find out why it's not appending !!!!

  function runPyScript(keyword,website){
    var jqXHR = $.ajax({
        type: "POST",
        url: "/getjsons.py",
        async: false,
        data: { param: keyword, website }
    });

    return jqXHR.responseText;
}
}
document.addEventListener("DOMContentLoaded", function() {
  window.data = document.getElementById("data");
  window.jsonButton = document.getElementById("json");
  
  addButton.onclick = function() {
    addb();
  };
});

