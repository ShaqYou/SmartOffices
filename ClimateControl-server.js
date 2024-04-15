//Importing the required parts
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
// Loading the proto file
const packageDefinition = protoLoader.loadSync('SmartOffice.proto');
const smartOfficeProto = grpc.loadPackageDefinition(packageDefinition).smart_office;


//gRPC server
const server= new grpc.Server();
