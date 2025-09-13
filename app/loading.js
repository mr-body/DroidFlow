class Loading extends React.Component {
	render() {
		return (
			<div>
				<div className="NoDevices ">
					<div className="header">
						<h1>DROIDFLOW</h1>
					</div>
					<div className="help-links" style={{margin: '20px 0'}}>
						<a href="https://www.asus.com/br/support/faq/1046846/" className="BtnHelp">How can you activate USB Debugging</a>
						<a href="https://github.com/Genymobile/scrcpy/releases" className="BtnHelp" style={{marginLeft: '10px'}}>Download Scrcpy</a>
					</div>
					<img src="../images/topbanner.png" alt="Not connected"/>
					<h1>Devices not detected</h1>
					<p>Please ensure:</p>
					<ul style={{textAlign: 'left', display: 'inline-block'}}>
						<li>USB Debugging is enabled on your Android device</li>
						<li>Your device is connected via USB cable</li>
						<li>ADB drivers are installed</li>
						<li>Scrcpy is installed for screen mirroring</li>
					</ul>
				</div>
			</div>
		)
	}
}