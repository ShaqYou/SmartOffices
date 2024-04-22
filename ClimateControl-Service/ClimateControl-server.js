//Importing the required parts
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
// Loading the proto file
const packageDefinition = protoLoader.loadSync('Proto/ClimateControl.proto');
const smartOfficeProto = grpc.loadPackageDefinition(packageDefinition).smart_office;


//gRPC server
const server= new grpc.Server();

server.addService(smartOfficeProto.ClientControl.service, {
  AdjustSettingsStream: (call, callback) => {
    let maxSettingValue = -1;
    call.on('data', (request) => {
      const { settingValue } = request;
      console.log(`Received setting adjustment request: ${settingValue}`);
      if (settingValue > maxSettingValue) {
        maxSettingValue = settingValue;
      }
    });
    call.on('end', () => {
      console.log(`Adjustment process ended. Maximum setting value received: ${maxSettingValue}`);
      callback(null, { status: `Maximum setting value received: ${maxSettingValue}` });
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
  console.log(`Climate Control Server running at http://127.0.0.1:${port}`);
})
