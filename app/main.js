const {app, BrowserWindow} = require('electron');

let mainWindow;

app.on('ready', function() {
  mainWindow =
    new BrowserWindow({
      width: 1024,
      height: 310, //512,
      frame: false,
      fullscreenable: false,
      maximizable: false
    });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.openDevTools();
});

app.on('window-all-closed', function () {
  app.quit()
});
