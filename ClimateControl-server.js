const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the Climate Control proto file
const packageDefinition = protoLoader.loadSync('Proto/ClimateControl.proto');
const smartofficeProto = grpc.loadPackageDefinition(packageDefinition).smartoffice;

// gRPC server
const server = new grpc.Server();

// Placeholder variable for storing current setting
let currentSetting = 25; // Default value

// Implement the Climate Control service
server.addService(smartofficeProto.ClimateControl.service, {
    AdjustSettingsStream: (call, callback) => {
        // Implementation for adjusting settings
    },
    ViewSettings: (call, callback) => {
        // Respond with the current setting
        callback(null, { currentSetting });
    }
});

// Binding the server
server.bindAsync('127.0.0.1:50053', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('Failed to start server:', err);
        return;
    }
    server.start();
    console.log(`Climate Control Server running at http://127.0.0.1:${port}`);
});
