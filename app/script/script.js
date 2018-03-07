BrowserWindow = require("electron");
const {download} = require("electron-dl");
const fs = require("fs");
const readline = require("readline");

onload = function() {
  document.addEventListener("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();

    for (let f of e.dataTransfer.files) {
      const rl = readline.createInterface({
        input: fs.createReadStream(f.path)
      });

      rl.on('line', (line) => {
        if (!line.trim())
        {
          console.log('Line from file:', line);
          download(document.querySelector("webview").getWebContents(), line).then(dl => console.log(dl.getSavePath())).catch(console.error);
        }
      });
    }
  });
  document.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
  });
  document.querySelector("#webview_button").addEventListener("click", function() {
    document.querySelector("webview").src = document.querySelector("#webview_input").value;
  });
};
