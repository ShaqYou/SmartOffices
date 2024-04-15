//Importing the required parts
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
// Loading the proto file
const packageDefinition = protoLoader.loadSync('SmartOffice.proto');
const smartOfficeProto = grpc.loadPackageDefinition(packageDefinition).smart_office;


//gRPC server
const server= new grpc.Server();

//Implementing methods for Climate Control 
server.addService(SmartOfficeProto.service, {
  //For Temperature
  AdjustTemperature: (call, callback) => {
    const targetTemperature = call.request.targetTemperature;
    console.log(`Adjusting temperature to ${targetTemperature} degrees.`);
    callback(null, { status: 'Temperature adjusted successfully.' });
  },
  //For Humidity
    AdjustHumidity: (call, callback) => {
    const himidityLevel = call.request.humidityLevel;
    console.log(`Adjusting humidity: ${humidityLevel}`);
    callback(null, { status: 'Humidity adjusted successfully.' });
  },
});

//Binding the server
server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err != null) {
    console.error(err);
    return;
  }
  server.start();
  console.log(`Climate Control Server running at http://127.0.0.1:${port}`);
})
