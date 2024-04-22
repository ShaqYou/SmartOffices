//Importing the required parts
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');

const packageDefinition = protoLoader.loadSync('SmartLighting.proto');
const smartOfficeProto = grpc.loadPackageDefinition(packageDefinition).smart_office;


// Create the client
const client = new smartOfficeProto.SmartLighting('localhost:50054', grpc.credentials.createInsecure());

// Unary RPC 
client.TurnOnOffLights({ isTurnedOn: true }, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('TurnOnOffLights Response:', response.status);
  }
});