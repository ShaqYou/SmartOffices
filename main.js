const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readlineSync = require('readline-sync');

// Load proto files
const smartLightingProtoDefinition = protoLoader.loadSync('Proto/SmartLighting.proto');
const smartMeetingRoomsProtoDefinition = protoLoader.loadSync('Proto/SmartMeetingRoom.proto');
const climateControlProtoDefinition = protoLoader.loadSync('Proto/ClimateControl.proto');

// Load proto definitions
const smartLightingProto = grpc.loadPackageDefinition(smartLightingProtoDefinition).smartoffice;
const smartMeetingRoomsProto = grpc.loadPackageDefinition(smartMeetingRoomsProtoDefinition).smartoffice;
const climateControlProto = grpc.loadPackageDefinition(climateControlProtoDefinition).smartoffice;

// Create gRPC clients for each service
const smartLightingClient = new smartLightingProto.SmartLighting('localhost:50051', grpc.credentials.createInsecure());
const smartMeetingRoomsClient = new smartMeetingRoomsProto.SmartMeetingRooms('localhost:50052', grpc.credentials.createInsecure());
const climateControlClient = new climateControlProto.ClimateControl('localhost:50053', grpc.credentials.createInsecure());

// Function to display menu options
function displayMenu() {
  console.log('\nChoose an option:');
  console.log('1. Control Climate Control Service');
  console.log('2. Control Smart Lighting Service');
  console.log('3. Control Smart Meeting Rooms Service');
  console.log('4. Exit');
}

// Function for Climate Control Service
function controlClimateControl() {
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
    const input = readlineSync.question('Enter setting values (comma-separated): ');
    const values = input.split(',').map(value => parseInt(value.trim(), 10));

    // Send setting adjustment requests
    values.forEach(value => {
      settingsStream.write({ settingValue: value });
    });

    // End the stream
    settingsStream.end();
  }

  // Prompt user to choose action
  console.log('Choose action:');
  console.log('1. Adjust settings');
  console.log('2. Back');

  const choice = readlineSync.question('Enter your choice: ');
  switch (choice) {
    case '1':
      adjustSettingsStream();
      break;
    case '2':
      // Return to main menu
      return main();
    default:
      console.log('Invalid choice.');
      // Retry
      controlClimateControl();
  }
}

// Function for Smart Lighting Service
function controlSmartLighting() {
  console.log('Smart Lighting Service');

  // Function to turn on/off lights
  function turnOnOffLights(isTurnedOn) {
    // Unary RPC to turn on/off lights
    smartLightingClient.TurnOnOffLights({ isTurnedOn }, (error, response) => {
      if (error) {
        console.error('Error:', error.message);
      } else {
        console.log('TurnOnOffLights Response:', response.status);
      }
      // Return to main menu
      return main();
    });
  }

  // Function to adjust brightness stream
  function adjustBrightnessStream() {
    // Create a writable stream
    const brightnessStream = smartLightingClient.AdjustBrightnessStream();

    // Handle stream errors
    brightnessStream.on('error', (error) => {
      console.error('Stream Error:', error.message);
    });

    // Prompt user to enter brightness level
    const brightnessLevel = readlineSync.question('Enter brightness level: ');

    // Send brightness adjustment request
    brightnessStream.write({ brightnessLevel: parseInt(brightnessLevel) });

    // End the stream
    brightnessStream.end();
  }

  // Prompt user to choose action
  console.log('Choose action:');
  console.log('1. Turn lights on');
  console.log('2. Turn lights off');
  console.log('3. Adjust brightness');
  console.log('4. Back');

  const choice = readlineSync.question('Enter your choice: ');
  switch (choice) {
    case '1':
      turnOnOffLights(true);
      break;
    case '2':
      turnOnOffLights(false);
      break;
    case '3':
      adjustBrightnessStream();
      break;
    case '4':
      // Return to main menu
      return main();
    default:
      console.log('Invalid choice.');
      // Retry
      controlSmartLighting();
  }
}

// Function for Smart Meeting Rooms Service
function controlSmartMeetingRooms() {
  console.log('Smart Meeting Rooms Service');

  // Function to book room with updates
  function bookRoomWithUpdates() {
    // Create bidirectional streaming RPC
    const bookRoomWithUpdatesStream = smartMeetingRoomsClient.BookRoomWithUpdates();

    // Handle stream errors
    bookRoomWithUpdatesStream.on('error', (error) => {
      console.error('Stream Error:', error.message);
    });

    // Prompt user to enter booking details
    const input = readlineSync.question('Enter booking details (roomId, startTime, endTime, organizer): ');
    const [roomId, startTime, endTime, organizer] = input.split(',').map(value => value.trim());

    // Send booking request
    bookRoomWithUpdatesStream.write({ roomId, startTime, endTime, organizer });

    // Receive and display responses
    bookRoomWithUpdatesStream.on('data', (response) => {
      console.log('BookRoomWithUpdatesStream Response:', response.bookingId, response.status);
    });

    // End the stream
    bookRoomWithUpdatesStream.end(() => {
      // Return to main menu
      main();
    });
  }

  // Prompt user to choose action
  console.log('Choose action:');
  console.log('1. Book room with updates');
  console.log('2. Back');

  const choice = readlineSync.question('Enter your choice: ');
  switch (choice) {
    case '1':
      bookRoomWithUpdates();
      break;
    case '2':
      // Return to main menu
      return main();
    default:
      console.log('Invalid choice.');
      // Retry
      controlSmartMeetingRooms();
  }
}

// Main function to run the CLI
function main() {
  displayMenu();

  const choice = readlineSync.question('Enter your choice: ');
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
      return;
    default:
      console.log('Invalid choice.');
  }

  // Recursive call to display menu again
  main();
}

// Start the CLI
main();
