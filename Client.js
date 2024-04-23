const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');

// Load proto files for Climate Control, Smart Lighting, and Smart Meeting Rooms
const climateControlProto = grpc.loadPackageDefinition(protoLoader.loadSync('Proto/ClimateControl.proto')).smartoffice;
const smartLightingProto = grpc.loadPackageDefinition(protoLoader.loadSync('Proto/SmartLighting.proto')).smartoffice;
const smartMeetingRoomsProto = grpc.loadPackageDefinition(protoLoader.loadSync('Proto/SmartMeetingRoom.proto')).smartoffice;

// Create clients for each service
const climateControlClient = new climateControlProto.ClimateControl('localhost:50053', grpc.credentials.createInsecure());
const smartLightingClient = new smartLightingProto.SmartLighting('localhost:50051', grpc.credentials.createInsecure());
const smartMeetingRoomsClient = new smartMeetingRoomsProto.SmartMeetingRooms('localhost:50052', grpc.credentials.createInsecure());

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to handle main menu choices
function handleMainMenuChoice(choice) {
    switch (choice) {
        case '1':
            displayClimateControlMenu();
            break;
        case '2':
            displaySmartLightingMenu();
            break;
        case '3':
            displaySmartMeetingRoomsMenu();
            break;
        case '4':
            console.log('Exiting...');
            process.exit(0);
            break;
        default:
            console.log('Invalid choice. Please enter a number between 1 and 4.');
            displayMainMenu();
            break;
    }
}

// Function to display main menu
function displayMainMenu() {
    console.log(`
===== Smart Office Control Panel =====
1. Climate Control
2. Smart Lighting
3. Smart Meeting Rooms
4. Exit
    `);
    rl.question('Enter your choice: ', (choice) => {
        handleMainMenuChoice(choice);
    });
}

// Function to start the application
function startApp() {
    console.log('Welcome to the Smart Office Control Panel!');
    displayMainMenu();
}

// Function to handle Climate Control menu choices
function handleClimateControlChoice(choice) {
    switch (choice) {
        case '1':
            console.log('Retrieving current Climate Control settings...');
            // Call the gRPC method to retrieve current settings
            climateControlClient.viewSettings({}, (error, response) => {
                if (error) {
                    console.error('Error retrieving Climate Control settings:', error);
                } else {
                    console.log('Current Climate Control settings:');
                    console.log('Setting Value:', response.currentSetting);
                }
                // After displaying settings, go back to the Climate Control menu
                displayClimateControlMenu();
            });
            break;
            case '2':
              console.log('Adjusting Climate Control settings...');
              rl.question('Enter the new setting value: ', (newSetting) => {
                  // Make sure the input is a valid number
                  if (isNaN(newSetting)) {
                      console.log('Invalid input. Please enter a valid number.');
                      displayClimateControlMenu();
                      return;
                  }
          
                  // Parse the input into an integer
                  const settingValue = parseInt(newSetting);
          
                  // Make the gRPC call to adjust the settings
                  const request = { settingValue };
                  climateControlClient.AdjustSettingsStream(request, (error, response) => {
                      if (error) {
                          console.error('Error adjusting Climate Control settings:', error);
                      } else {
                          console.log('Climate Control settings adjusted successfully.');
                      }
                      // After adjusting settings, go back to the Climate Control menu
                      displayClimateControlMenu();
                  });
              });
              break;
          
        case '3':
            displayMainMenu();
            break;
        default:
            console.log('Invalid choice. Please enter a number between 1 and 3.');
            displayClimateControlMenu();
            break;
    }
}

// Function to handle Smart Lighting menu choices
function handleSmartLightingChoice(choice) {
    switch (choice) {
        case '1':
            console.log('Turning lights on/off...');
            // Turn lights on/off logic goes here
            break;
        case '2':
            console.log('Adjusting brightness...');
            // Adjust brightness logic goes here
            break;
        case '3':
            displayMainMenu();
            break;
        default:
            console.log('Invalid choice. Please enter a number between 1 and 3.');
            displaySmartLightingMenu();
            break;
    }
}

// Function to handle Smart Meeting Rooms menu choices
function handleSmartMeetingRoomsChoice(choice) {
    switch (choice) {
        case '1':
            console.log('Booking a room...');
            // Book a room logic goes here
            break;
        case '2':
            console.log('Viewing bookings...');
            // View bookings logic goes here
            break;
        case '3':
            displayMainMenu();
            break;
        default:
            console.log('Invalid choice. Please enter a number between 1 and 3.');
            displaySmartMeetingRoomsMenu();
            break;
    }
}

// Function to display Climate Control menu
function displayClimateControlMenu() {
    console.log(`
===== Climate Control Menu =====
1. View Current Settings
2. Adjust Settings
3. Back to Main Menu
    `);
    rl.question('Enter your choice: ', (choice) => {
        handleClimateControlChoice(choice);
    });
}

// Function to display Smart Lighting menu
function displaySmartLightingMenu() {
    console.log(`
===== Smart Lighting Menu =====
1. Turn Lights On/Off
2. Adjust Brightness
3. Back to Main Menu
    `);
    rl.question('Enter your choice: ', (choice) => {
        handleSmartLightingChoice(choice);
    });
}

// Function to display Smart Meeting Rooms menu
function displaySmartMeetingRoomsMenu() {
    console.log(`
===== Smart Meeting Rooms Menu =====
1. Book a Room
2. View Bookings
3. Back to Main Menu
    `);
    rl.question('Enter your choice: ', (choice) => {
        handleSmartMeetingRoomsChoice(choice);
    });
}

// Start the application
startApp();
