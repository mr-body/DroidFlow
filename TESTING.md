# DroidFlow Execution Testing Guide

## Prerequisites for Testing

### Required Software:
1. **Android SDK Platform-Tools** (for ADB)
   - Download: https://developer.android.com/studio/releases/platform-tools
   - Ensure `adb` is in your PATH

2. **Scrcpy** (for screen mirroring)
   - Download: https://github.com/Genymobile/scrcpy/releases
   - Or install via package manager:
     - Windows: `scoop install scrcpy`
     - macOS: `brew install scrcpy`
     - Linux: `apt install scrcpy` (or equivalent)

3. **Node.js and Electron** (already installed via npm)

### Android Device Setup:
1. Enable **Developer Options** on your Android device
2. Enable **USB Debugging** in Developer Options
3. Connect device via USB cable
4. Authorize the computer when prompted on device

## Testing the Execution Functionality

### 1. Verify Dependencies
```bash
# Check ADB
adb version
adb devices

# Check Scrcpy
scrcpy --version

# Check Node.js and dependencies
npm list
```

### 2. Test Device Detection
```bash
# This should show your connected device
adb devices
```
Expected output:
```
List of devices attached
ABCD123456    device
```

### 3. Run the Application
```bash
npm start
```

### 4. Test Execution Flow

**When no devices are connected:**
- App should show the "Devices not detected" screen
- Links to USB debugging help and scrcpy download should be visible

**When devices are connected:**
- Device list should appear with device brand, model, and ID
- Clicking on a device should:
  - Show visual feedback ("Conectando..." status)
  - Trigger IPC communication
  - Attempt to execute scrcpy for that device
  - If scrcpy unavailable, fallback to ADB connection test

### 5. Verify Console Output

Check the Electron console for:
```
Device selected: [DEVICE_ID]
Executing device control for device: [DEVICE_ID]
Starting scrcpy for device: [DEVICE_ID]
Scrcpy started for device [DEVICE_ID]
```

Or if scrcpy is not available:
```
Scrcpy not found in PATH
Scrcpy not available, trying alternative methods...
Alternative connection successful: Device connected successfully
```

## Expected Behavior

### Successful Execution:
1. Click device → Visual feedback appears
2. Scrcpy window opens showing device screen
3. Device can be controlled via mouse/keyboard
4. Console shows successful execution logs

### Fallback Behavior (no scrcpy):
1. Click device → Visual feedback appears
2. Console shows scrcpy unavailable message
3. ADB connection test runs successfully
4. User guidance provided about installing scrcpy

### Error Handling:
- Invalid device IDs are rejected
- Connection errors are logged
- User-friendly error messages provided

## Troubleshooting

### Device Not Detected:
- Ensure USB debugging is enabled
- Try different USB cable/port
- Check device authorization
- Restart ADB: `adb kill-server && adb start-server`

### Scrcpy Issues:
- Verify scrcpy is in PATH
- Test manual execution: `scrcpy -s [DEVICE_ID]`
- Check device compatibility

### App Issues:
- Check console for JavaScript errors
- Verify all files are present
- Restart the application

## Architecture Overview

The execution flow follows this pattern:
```
UI Click → IPC Message → Execution Handler → Scrcpy/ADB → Device Control
```

**Files involved:**
- `app/device.js` - UI and user interaction
- `ipc.js` - Inter-process communication and execution logic
- `main.js` - Electron main process
- `app/index.js` - Device detection and React app