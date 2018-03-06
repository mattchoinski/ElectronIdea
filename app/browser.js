BrowserWindow = require('electron');
const {download} = require('electron-dl');
const fs = require("fs");
const readline = require('readline');

var isLoading = false;
onload = function() {
  //var webview = document.querySelector('webview');
  doLayout();

  document.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();

    for (let f of e.dataTransfer.files) {
      const rl = readline.createInterface({
        input: fs.createReadStream(f.path)
      });

      rl.on('line', (line) => {
        console.log('Line from file:', line);
        //download(document.querySelector('webview').getWebContents(), line).then(dl => console.log(dl.getSavePath())).catch(console.error);
      });
    }
  });
  document.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
  });
};

//  document.querySelector('#location-form').onsubmit = function(e) {
//    e.preventDefault();
//
//    navigateTo(document.querySelector('#location').value);
//  };
//function navigateTo(url) {
//  document.querySelector('webview').src = url;
//}

function doLayout() {
 var windowWidth = document.documentElement.clientWidth;
 var windowHeight = document.documentElement.clientHeight;

 var elementBody = document.body;
 var elementBodyStyle = elementBody.style;
 elementBodyStyle.height = windowHeight + "px";
}

function handleExit(event) {
  console.log(event.type);
  document.body.classList.add('exited');
  if (event.type == 'abnormal') {
    document.body.classList.add('crashed');
  } else if (event.type == 'killed') {
    document.body.classList.add('killed');
  }
}
