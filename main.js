const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');

// Load proto files
const climateControlProtoDefinition = protoLoader.loadSync('Proto/ClimateControl.proto');
const smartLightingProtoDefinition = protoLoader.loadSync('Proto/SmartLighting.proto');
const smartMeetingRoomProtoDefinition = protoLoader.loadSync('Proto/SmartMeetingRoom.proto');

// Load gRPC package definitions
const climateControlPackageDefinition = grpc.loadPackageDefinition(climateControlProtoDefinition).smartoffice;
const smartLightingPackageDefinition = grpc.loadPackageDefinition(smartLightingProtoDefinition).smartoffice;
const smartMeetingRoomPackageDefinition = grpc.loadPackageDefinition(smartMeetingRoomProtoDefinition).smartoffice;

// Create gRPC clients for each service
const climateControlClient = new climateControlPackageDefinition.ClimateControl('localhost:50053', grpc.credentials.createInsecure());
const smartLightingClient = new smartLightingPackageDefinition.SmartLighting('localhost:50051', grpc.credentials.createInsecure());
const smartMeetingRoomClient = new smartMeetingRoomPackageDefinition.SmartMeetingRooms('localhost:50052', grpc.credentials.createInsecure());

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to adjust climate control settings
function adjustClimateControl() {
  rl.question('Enter new setting value: ', (input) => {
    const settingValue = parseInt(input);
    if (isNaN(settingValue)) {
      console.log('Invalid input. Please enter a valid number.');
      adjustClimateControl();
      return;
    }

    const request = { settingValue };
    climateControlClient.adjustSettingsStream(request, (err, response) => {
      if (err) {
        console.error('Error adjusting climate control settings:', err);
        return;
      }
      console.log('Status:', response.status);
      rl.close();
    });
  });
}

// Function to control smart lighting
function controlSmartLighting() {
  rl.question('Turn lights on or off? (true/false): ', (input) => {
    const isTurnedOn = input.toLowerCase() === 'true';
    const request = { isTurnedOn };
    smartLightingClient.turnOnOffLights(request, (err, response) => {
      if (err) {
        console.error('Error controlling smart lighting:', err);
        return;
      }
      console.log('Status:', response.status);
      rl.close();
    });
  });
}

// Function to book a meeting room
function bookMeetingRoom() {
  rl.question('Enter room ID: ', (roomId) => {
    rl.question('Enter start time (YYYY-MM-DD HH:MM): ', (startTime) => {
      rl.question('Enter end time (YYYY-MM-DD HH:MM): ', (endTime) => {
        rl.question('Enter organizer name: ', (organizer) => {
          const request = { roomId, startTime, endTime, organizer };
          const call = smartMeetingRoomClient.bookRoomWithUpdates();
          call.write(request);
          call.on('data', (response) => {
            console.log('Booking ID:', response.bookingId);
            console.log('Status:', response.status);
            rl.close();
          });
        });
      });
    });
  });
}

// Main menu
function mainMenu() {
  console.log('\nMain Menu');
  console.log('1. Adjust Climate Control Settings');
  console.log('2. Control Smart Lighting');
  console.log('3. Book Meeting Room');
  console.log('4. Exit');
  rl.question('Select an option: ', (option) => {
    switch (option) {
      case '1':
        adjustClimateControl();
        break;
      case '2':
        controlSmartLighting();
        break;
      case '3':
        bookMeetingRoom();
        break;
      case '4':
        console.log('Exiting...');
        process.exit();
        break;
      default:
        console.log('Invalid option. Please select again.');
        mainMenu();
        break;
    }
  });
}

// Start the main menu
mainMenu();
