//Importing the required parts
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('SmartOffice.proto');
const smartOfficeProto = grpc.loadPackageDefinition(packageDefinition).smart_office;


//Creating a rpc server
const server = new grpc.Server();

//Implementing methods
server.addService(smartOfficeProto.SmartOffice.service, {
  ToggleLights: (call, callback) => {
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