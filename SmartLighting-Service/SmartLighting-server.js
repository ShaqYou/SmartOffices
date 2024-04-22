//Importing the required parts
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('Proto/Smartlighting.proto');
const smartOfficeProto = grpc.loadPackageDefinition(packageDefinition).smart_office;


//Creating a rpc server
const server = new grpc.Server();
// Implement methods
server.addService(smartOfficeProto.SmartLighting.service, {
  TurnOnOffLights: (call, callback) => {
    const isTurnedOn = call.request.isTurnedOn;
    const status = isTurnedOn ? 'Lights turned on' : 'Lights turned off';
    console.log(status);
    callback(null, { status });
  },

  AdjustBrightnessStream: (call) => {
    call.on('data', (request) => {
      const { brightnessLevel } = request;
      console.log(`Received brightness adjustment request: ${brightnessLevel}`);
      // Process brightness adjustment logic here
      const status = 'Brightness adjusted successfully';
      call.write({ status });
    });
    call.on('end', () => {
      console.log('Brightness adjustment process ended.');
      call.end();
    });
  },
});

//Binding the server
server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err != null) {
      console.error(err);
      return;
  }
  server.start();
  console.log(`Lighting System Server running at http://127.0.0.1:${port}`);
});