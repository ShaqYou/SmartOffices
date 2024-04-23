const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the Climate Control proto file
const packageDefinition = protoLoader.loadSync('Proto/ClimateControl.proto');
const smartofficeProto = grpc.loadPackageDefinition(packageDefinition).smartoffice;

// Create a gRPC server
const server = new grpc.Server();

let currentSetting = 25; // Default value

// Implement the Climate Control service
server.addService(smartofficeProto.ClimateControl.service, {
  AdjustSettingsStream: (call, callback) => {
    // Event listener for incoming data from the client
    call.on('data', (request) => {
      const settingValue = request.settingValue;
      console.log('Received setting value:', settingValue);
      
      // Perform input validation
      if (isNaN(settingValue)) {
        // If the setting value is not a number, throw an error
        const error = new Error('Invalid setting value. Please provide a valid number.');
        call.emit('error', error); 
        return;
      }
      
      // Update the current setting
      currentSetting = parseFloat(settingValue);
    });

    // Event listener for the end of the client stream
    call.on('end', () => {
      // Send a success response to the client
      callback(null, { status: 'Settings adjusted successfully' });
    });
    
    // Event listener for errors during stream processing
    call.on('error', (error) => {
      // Log the error
      console.error('Error occurred during stream processing:', error);
      // Send an error response to the client
      callback(error);
    });
  }
});

// Binding the server
const bindAddress = '127.0.0.1:50053';
server.bindAsync(bindAddress, grpc.ServerCredentials.createInsecure(), (err, port) => {
  // Check if there was an error during server binding
  if (err) {
    console.error('Failed to start server:', err);
    return;
  }
  // Server successfully started
  server.start();
  console.log(`Climate Control Server running at http://${bindAddress}`);
});
