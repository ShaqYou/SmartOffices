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

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Function to display menu options
function displayMenu() {
    console.log('\nChoose an option:');
    console.log('1. Control Climate Control Service');
    console.log('2. Control Smart Lighting Service');
    console.log('3. Control Smart Meeting Rooms Service');
    console.log('4. Exit');
  }

  // Functions for 3 services

  // Function for Climate Control Service
  function controlClimateControl(){
    console.log('Climate Control Service');

    // Function to adjust settings stream
    function adjustSettingsStream() {
      const settingsStream = climateControlClient.AdjustSettingsStream((error, response) => {
        if (error) {
          console.error('Error:', error.message);
        } else {
          console.log('SettingsResponse:', response.status);
        }
      });
  
      // Handle stream errors
      settingsStream.on('error', (error) => {
        console.error('Stream Error:', error.message);
      });
  
      // Prompt user to enter setting values
      rl.question('Enter setting values (comma-separated): ', (input) => {
        const values = input.split(',').map(value => parseInt(value.trim(), 10));
  
        // Send setting adjustment requests
        values.forEach(value => {
          settingsStream.write({ settingValue: value });
        });
  
        // End the stream
        settingsStream.end();
      });
    }
  
    // Prompt user to choose action
    console.log('Choose action:');
    console.log('1. Adjust settings');
    console.log('2. Back');
  
    rl.question('Enter your choice: ', (choice) => {
      switch (choice) {
        case '1':
          adjustSettingsStream();
          break;
        case '2':
          // Return to main menu
          main();
          break;
        default:
          console.log('Invalid choice.');
          // Retry
          controlClimateControl();
      }
    });
  }
  
  //Function for Smart Lighting Service
  function controlSmartLighting(){

  }

  //Function for Smart Meeting Rooms Service
  function controlSmartMeetingRooms(){

  }

  // Main function to run the CLI
  function main() {
    displayMenu();
  }

  rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
      case '1':
        controlClimateControl();
        break;
      case '2':
        controlSmartLighting();
        break;
      case '3':
        controlSmartMeetingRooms();
        break;
      case '4':
        console.log('Exiting...');
        rl.close();
        return;
      default:
        console.log('Invalid choice.');
    }

    // Recursive call to display menu again
    main();
  });


// Start the CLI
main();


