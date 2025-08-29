const { ipcRenderer } = require('electron');

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDevice: null,
      executing: false
    };
  }

  btnClick(device) {
    this.setState({ selectedDevice: device.id, executing: true });
    ipcRenderer.send('button-click', device.id);
    
    // Reset executing state after a delay to show feedback
    setTimeout(() => {
      this.setState({ executing: false });
    }, 3000);
  }

  render() {
    const { devices } = this.props;
    const { selectedDevice, executing } = this.state;
    
    return (
      <div className="device-list">
        <h2>Dispositivos Conectados</h2>
        {executing && (
          <div className="alert">
            <i className="bx bx-loader-alt bx-spin"></i> Executando controle do dispositivo...
          </div>
        )}
        <ul>
          {devices.map((device, index) => (
            <li 
              key={index} 
              onClick={() => this.btnClick(device)}
              className={`device-item ${selectedDevice === device.id ? 'selected' : ''}`}
            >
              <div className="device-info">
                <strong>Marca:</strong> {device.brand} | <strong>Modelo:</strong> {device.model}
              </div>
              <div className="device-info">
                <strong>ID:</strong> {device.id}
              </div>
              {selectedDevice === device.id && executing && (
                <div className="device-status">
                  <i className="bx bx-wifi"></i> Conectando...
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="help-text">
          <i className="bx bx-info-circle"></i> Clique em um dispositivo para iniciar o controle via scrcpy
        </div>
      </div>
    );
  }
}
