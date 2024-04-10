const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition=protoLoader.loadSync('SmartLighting.proto');