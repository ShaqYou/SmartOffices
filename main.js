const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readlineSync = require('readline-sync');

// Load proto files
const smartLightingProto = grpc.loadPackageDefinition(protoLoader.loadSync('proto/SmartLighting.proto')).smartoffice;
const smartMeetingRoomsProto = grpc.loadPackageDefinition(protoLoader.loadSync('proto/SmartMeetingRooms.proto')).smartoffice;
const climateControlProto = grpc.loadPackageDefinition(protoLoader.loadSync('proto/ClimateControl.proto')).smartoffice;

// Create gRPC clients for each service
const smartLightingClient = new smartLightingProto.SmartLighting('localhost:50051', grpc.credentials.createInsecure());
const smartMeetingRoomsClient = new smartMeetingRoomsProto.SmartMeetingRooms('localhost:50052', grpc.credentials.createInsecure());
const climateControlClient = new climateControlProto.ClimateControl('localhost:50053', grpc.credentials.createInsecure());