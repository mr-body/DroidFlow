const { ipcMain } = require('electron');

function init() {

  ipcMain.on('button-click', (event, arg) => {
    // Lógica para manipular o clique do botão
    console.log('Botão clicado:', arg);
  });
  
}

module.exports = { init };
