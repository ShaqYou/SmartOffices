// Import required parts

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');

const packageDefinition = protoLoader.loadSync('SmartOffice.proto');
const smartOfficeProto = grpc.loadPackageDefinition(packageDefinition).smart_office;

//Create the client
const client = new smartOfficeProto.SmartMeetingRooms('localhost:50053', grpc.credentials.createInsecure());

//Functions for user input
const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function askQuestion(query) {
    return new Promise(resolve => userInput.question(query, resolve));
  }
  
  async function main() {
    const choice = await askQuestion('Insert (1) to book a room or (2) to cancel a booking!');
    switch (choice) {
      case '1':
        await bookRoom();
        break;
      case '2':
        await cancelBooking();
        break;
      default:
        console.log('Invalid choice');
        userInput.close();
        break;
    }
  }

  //Function for booking a room 
  async function bookRoom() {
    const roomId = await askQuestion('Enter room ID: ');
    const meetingTime = await askQuestion('Enter meeting time (YYYY-MM-DD HH:mm): ');
    const meetingDuration = await askQuestion('Enter meeting duration (e.g., 1 hour): ');
  
    client.BookRoom({ room_id: roomId, meeting_time: meetingTime, meeting_duration: meetingDuration }, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Room booked successfully. Booking ID: ${response.booking_id}`);
      }
      userInput.close();
    });
  }

  //Function for cancelling a room
  async function cancelBooking() {
    const bookingId = await askQuestion('Enter booking ID to cancel: ');
  
    client.CancelBooking({ booking_id: bookingId }, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Room has been cancelled.');
      }
      userInput.close();
    });
  }
  
  main();