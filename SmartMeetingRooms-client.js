// Import required parts

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');

const packageDefinition = protoLoader.loadSync('SmartOffice.proto');
const smartOfficeProto = grpc.loadPackageDefinition(packageDefinition).smart_office;

//Create the client
const client = new smartOfficeProto.SmartMeetingRooms('localhost:50053', grpc.credentials.createInsecure());