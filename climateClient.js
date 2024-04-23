const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the proto file
const packageDefinition = protoLoader.loadSync('Proto/ClimateControl.proto');
const smartofficeProto = grpc.loadPackageDefinition(packageDefinition).smartoffice;

// Create a gRPC client
const client = new smartofficeProto.ClimateControl('localhost:50053', grpc.credentials.createInsecure());

// Make a gRPC call
client.AdjustSettingsStream({}, (error, response) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Response:', response);
    }
});
