const { ipcMain } = require('electron');
const { exec, spawn } = require('child_process');

function init() {
  ipcMain.on('button-click', (event, deviceId) => {
    console.log('Device selected:', deviceId);
    executeDeviceControl(deviceId);
  });
}

function executeDeviceControl(deviceId) {
  if (!deviceId || deviceId.trim() === '') {
    console.error('Invalid device ID');
    return;
  }

  console.log(`Executing device control for device: ${deviceId}`);
  
  // First, try to execute scrcpy
  tryScrcpy(deviceId).catch(() => {
    // If scrcpy fails, try alternative methods
    console.log('Scrcpy not available, trying alternative methods...');
    tryAlternativeControl(deviceId);
  });
}

function tryScrcpy(deviceId) {
  return new Promise((resolve, reject) => {
    // Check if scrcpy is available
    exec('scrcpy --version', (error) => {
      if (error) {
        console.log('Scrcpy not found in PATH');
        reject(new Error('Scrcpy not available'));
        return;
      }
      
      console.log(`Starting scrcpy for device: ${deviceId}`);
      
      // Execute scrcpy command for the selected device
      const command = `scrcpy -s ${deviceId}`;
      
      const child = spawn('scrcpy', ['-s', deviceId], {
        detached: true,
        stdio: ['ignore', 'ignore', 'ignore']
      });

      child.on('spawn', () => {
        console.log(`Scrcpy started for device ${deviceId}`);
        child.unref(); // Allow parent to exit
        resolve();
      });

      child.on('error', (error) => {
        console.error(`Error starting scrcpy: ${error.message}`);
        reject(error);
      });

      child.on('exit', (code) => {
        console.log(`Scrcpy exited with code ${code} for device ${deviceId}`);
      });
    });
  });
}

function tryAlternativeControl(deviceId) {
  console.log(`Trying alternative control methods for device: ${deviceId}`);
  
  // Try to open adb shell as a fallback
  exec(`adb -s ${deviceId} shell echo "Device connected successfully"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error connecting to device: ${error.message}`);
      console.log(`You may need to install scrcpy or ensure ADB is properly configured.`);
      console.log(`Device ID: ${deviceId}`);
      return;
    }
    
    console.log(`Alternative connection successful: ${stdout.trim()}`);
    console.log(`Device ${deviceId} is ready for control. Please install scrcpy for screen mirroring.`);
    
    // Could implement additional fallback options here
    // such as opening device-specific control interfaces
  });
}

module.exports = { init };
