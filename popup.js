// localStorage.removeItem('registered');

var unlocked = true;

var append = function(text) {
  data.appendChild(document.createTextNode(text));
};

const downloadFile = ({ data, filename }) => {
  const blob = new Blob([data], {
    type: "application/octet-binary"
  });
  const url = URL.createObjectURL(blob);

  chrome.downloads.download({ url, filename });
  // const pom = document.createElement("a");
  // pom.setAttribute("href", url);
  // pom.setAttribute("download", filename);
  // pom.click();
};

var download = function(keyword) {
  runPyScript(keyword,window.location.href);
  /*
  chrome.history.search(
    {
      text: "",
      // 'maxResults': 100,
      maxResults: 1,
      startTime: 0
    },
    function(res) {
      window.res = res;

      var text, filename;

      // put the data in a hidden div so chrome doesn't crash
      
        append("[");
        for (var i = 0; i < res.length; i++) {
          text = JSON.stringify(res[i]);
          if (i !== res.length - 1) text = text + ",";
          append(text);
        }
        append("]");
      

      const isoDate = new Date().toISOString().substr(0, 10);

      downloadFile({
        filename: isoDate + " " + filename,
        data: data.innerText
      });

      // window.close();
    } 
  ); */
};
function getURL() {
  runPyScript("testing",window.location.href);
 
}
function runPyScript(keyword,website){
  var jqXHR = $.ajax({
      type: "POST",
      url: "/Users/abojo/Documents/GitHub/Recherche-par-mots-Cl-s-Intelligente/getjsons.py",
      data: { param: keyword, website },
      success: callbackFunc
  });

   return jqXHR.responseText;
}
function callbackFunc(response)
{
   alert("working");
}
function mykeyword() {
  var keyword = prompt("What's the keyword?");
}
document.addEventListener("DOMContentLoaded", function() {
  window.data = document.getElementById("data");
  window.keywordButton = document.getElementById("keyword");
  window.addButton = document.getElementById("add");
  
  keywordButton.onclick = function() {
    mykeyword();
  };

  addButton.onclick = function() {
    download(keyword);
  };
});
