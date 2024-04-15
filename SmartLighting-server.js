//Importing the required parts
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('SmartOffice.proto');
const smartOfficeProto = grpc.loadPackageDefinition(packageDefinition).smart_office;


//Creating a rpc server
const server = new grpc.Server();

//Implementing methods
server.addService(smartOfficeProto.SmartOffice.service, {
  TurnOnOffLights: (call, callback) => {
      const { on } = call.request;
      const status = on ? 'Lights turned on' : 'Lights turned off';
      console.log(status);
      callback(null, { status });
  },

  AdjustBrightness: (call, callback) => {
      const { brightnessLevel } = call.request;
      const status = `Brightness adjusted to ${brightnessLevel}`;
      console.log(status);
      callback(null, { status });
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