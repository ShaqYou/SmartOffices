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


