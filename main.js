const { app, BrowserWindow, ipcMain} = require('electron')
const { exec } = require('child_process');
const apc = require('./ipc');

apc.init();

let mainWindow = null
function FormMain() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      devTools: false,
      // preload: path.join(__dirname, 'preload.js'),
      zoomFactor: 0.68
    },
    autoHideMenuBar: true,
    // icon: path.join(__dirname, '256x256.png'),
  })

  mainWindow.loadFile('app/public/index.html');
  
  mainWindow.on('closed', function () {
    mainWindow = null;
    if (process.platform !== 'darwin') app.quit()
  });
}


app.whenReady().then(() => {
  FormMain()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) FormMain()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit', () => {
  // Encerra o processo Python quando o aplicativo está prestes a ser fechado
});

