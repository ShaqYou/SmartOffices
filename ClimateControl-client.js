// Import necessary parts
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');

//Creating Client
const packageDefinition = protoLoader.loadSync('SmartOffice.proto');
const SmartOfficeProto = grpc.loadPackageDefinition(packageDefinition).SmartOffice;
const client = new climateControlProto('localhost:50051', grpc.credentials.createInsecure());
