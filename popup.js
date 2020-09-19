// localStorage.removeItem('registered');

var unlocked = false;
var unlock = function() {
  unlocked = true;
  window.csvButton.className = window.csvButton.className.replace(
    "caution",
    "action"
  );
  document.getElementById("thankyou").style.display = "block";
  
};





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

data.onclick= function(){
  chrome.history.search(
    {
      text: "",
      // 'maxResults': 100,
      maxResults: 1,
      startTime: 0
    },
    function(res) {
      window.res = res;

      var keyword, text, filename;

      // put the data in a hidden div so chrome doesn't crash
     
      if(format=="json"){
        filename = "history.json";

        append("[");
        for (var i = 0; i < res.length; i++) {
          text = JSON.stringify(res[i]);
          if (i !== res.length - 1) text = text + ",";
          append(text);
        }
        append("]");
      }
  append(text);  
});}


var download = function(format) {
  
  
  document.getElementById("content").innerText = "preparing file...";

  

      const isoDate = new Date().toISOString().substr(0, 10);

      downloadFile({
        filename: isoDate + " " + filename,
        data: data.innerText
      });

      // window.close();
    }
  

document.addEventListener("DOMContentLoaded", function() {
  window.data = document.getElementById("data");
  window.jsonButton = document.getElementById("json");
 
 

  jsonButton.onclick = function() {
    download("json");
  };

  

  // document.getElementById('titlex').onclick = register;

  // if(localStorage['registered']) register();
});
