// Import necessary parts
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');

//Creating Client
const packageDefinition = protoLoader.loadSync('ClimateControl.proto');
const SmartOfficeProto = grpc.loadPackageDefinition(packageDefinition).SmartOffice;
const client = new climateControlProto('localhost:50051', grpc.credentials.createInsecure());
const settingsStream = client.AdjustSettingsStream((error, response) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('SettingsResponse:', response.status);
    }
  });
  
  // Sending multiple setting adjustment requests
  settingsStream.write({ settingValue: 10 });
  settingsStream.write({ settingValue: 20 });
  settingsStream.write({ settingValue: 30 });
  settingsStream.end();