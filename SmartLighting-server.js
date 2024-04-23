const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync('Proto/SmartLighting.proto');
const smartOfficeProto = grpc.loadPackageDefinition(packageDefinition).smartoffice;

console.log(smartOfficeProto);

// Creating a gRPC server
const server = new grpc.Server();

// Implementing methods
server.addService(smartOfficeProto.SmartLighting.service, {
  TurnOnOffLights: (call, callback) => {
    const isTurnedOn = call.request.isTurnedOn;
    const status = isTurnedOn ? 'Lights turned on' : 'Lights turned off';
    console.log(status);
    callback(null, { status });
  },

  AdjustBrightnessStream: (call) => {
    console.log('Received brightness adjustment stream request');
    call.on('data', (request) => {
      const { brightnessLevel } = request;
      console.log(`Received brightness adjustment request: ${brightnessLevel}`);
      // Process brightness adjustment logic here
      const adjustedBrightness = adjustBrightness(brightnessLevel); // Call a function to adjust brightness
      const status = `Brightness adjusted to ${adjustedBrightness}`;
      call.write({ status });
    });
    call.on('end', () => {
      console.log('Brightness adjustment process ended.');
      call.end();
    });
  },
});

// Binding the server
server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err != null) {
    console.error(err);
    return;
  }
  server.start();
  console.log(`Lighting System Server running at http://127.0.0.1:${port}`);
});

// Function to adjust brightness
function adjustBrightness(brightnessLevel) {
    // Example: limit brightness to a range of 0 to 100
    const adjustedBrightness = Math.max(0, Math.min(100, brightnessLevel));
    return adjustedBrightness;
}
