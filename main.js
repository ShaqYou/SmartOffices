const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readlineSync = require('readline-sync');

// Load proto files
const smartLightingProto = grpc.loadPackageDefinition(protoLoader.loadSync('proto/SmartLighting.proto')).smartoffice;
const smartMeetingRoomsProto = grpc.loadPackageDefinition(protoLoader.loadSync('proto/SmartMeetingRooms.proto')).smartoffice;
const climateControlProto = grpc.loadPackageDefinition(protoLoader.loadSync('proto/ClimateControl.proto')).smartoffice;