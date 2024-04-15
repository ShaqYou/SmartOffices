//Importing the required parts
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');

const packageDefinition = protoLoader.loadSync('SmartOffice.proto');
const smartOfficeProto = grpc.loadPackageDefinition(packageDefinition).smart_office;
const client = new smartOfficeProto.SmartOffice('localhost:50051', grpc.credentials.createInsecure());