import ngrok from 'ngrok'

async function startNgrok() {
  try {
    // Pass the authtoken programmatically if needed
    await ngrok.authtoken('2rIfDEy0pHSypRPMqHDX0hAAQG1_hfbRG9iDGN1gb9qEPCv2');

    // Start Ngrok on port 3000
    const url = await ngrok.connect(3000);
    console.log('Ngrok URL: ' + url);
  } catch (error) {
    console.error('Error starting Ngrok: ', error);
  }
}

startNgrok();