const { app, BrowserWindow } = require('electron');

function createWindow () {
    const win = new BrowserWindow({fullscreen: true, autoHideMenuBar: true, webPreferences: {
    nodeIntegration: true
  }});

    win.loadFile('www/index.html');
    
    var appName = require(__dirname + '/package.json').name;
    
    

  
      process.on("uncaughtException", (err) => {

       app.exit(1);
    });
    
    // win.maximize();
    // win.show();
    //win.removeMenu();
}
app.whenReady().then(() => {
    createWindow()
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})