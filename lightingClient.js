const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('Proto/SmartLighting.proto');
const smartOfficeProto = grpc.loadPackageDefinition(packageDefinition).smartoffice;

// Create a gRPC client for the SmartLighting service
const client = new smartOfficeProto.SmartLighting('localhost:50051', grpc.credentials.createInsecure());

// Function to adjust brightness level (server streaming RPC)
function adjustBrightness() {
  return new Promise((resolve, reject) => {
    const adjustBrightnessRequest = { brightnessLevel: 75 }; // Set brightness level to 75
    const stream = client.AdjustBrightnessStream(adjustBrightnessRequest);
    stream.on('data', (response) => {
      console.log('Brightness adjustment status:', response.status);
    });
    stream.on('end', () => {
      console.log('Brightness adjustment process completed.');
      resolve();
    });
    stream.on('error', (error) => {
      reject(error);
    });
  });
}

// Unary RPC: Turn on/off lights
const turnOnOffRequest = { isTurnedOn: true }; // Set to true to turn the lights on
client.TurnOnOffLights(turnOnOffRequest, (error, response) => {
  if (error) {
    console.error('Error turning on/off lights:', error);
  } else {
    console.log('Turn on/off lights response:', response.status);
    // Call server streaming RPC after turning on/off lights
    adjustBrightness()
      .then(() => {
        console.log('Server streaming RPC method completed.');
      })
      .catch((error) => {
        console.error('Error in server streaming RPC:', error);
      });
  }
});
