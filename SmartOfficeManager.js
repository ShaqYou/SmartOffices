// Required parts
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');

// Load the proto file
const packageDefinition = protoLoader.loadSync('SmartOffice.proto');
const smartOfficeProto = grpc.loadPackageDefinition(packageDefinition).smart_office;

// Create gRPC clients services
const lightingClient = new smartOfficeProto.SmartLighting('localhost:50051', grpc.credentials.createInsecure());
const climateControlClient = new smartOfficeProto.ClimateControl('localhost:50052', grpc.credentials.createInsecure());
const meetingRoomsClient = new smartOfficeProto.SmartMeetingRooms('localhost:50053', grpc.credentials.createInsecure());

const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function askQuestion(query) {
    return new Promise(resolve => userInput.question(query, resolve));
  }