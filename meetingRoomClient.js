const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the proto file for the Smart Meeting Rooms service
const smartMeetingRoomsProto = grpc.loadPackageDefinition(protoLoader.loadSync('Proto/SmartMeetingRoom.proto')).smartoffice;

// Address and port for the Smart Meeting Rooms server
const smartMeetingRoomsAddress = '127.0.0.1:50052';

// Create a client for the Smart Meeting Rooms service
const smartMeetingRoomsClient = new smartMeetingRoomsProto.SmartMeetingRooms(smartMeetingRoomsAddress, grpc.credentials.createInsecure());

// Test Smart Meeting Rooms service
const bookRoomRequest = { roomId: '123', startTime: '2024-04-23T10:00:00', endTime: '2024-04-23T12:00:00', organizer: 'John Doe' };
smartMeetingRoomsClient.bookRoomWithUpdates(bookRoomRequest, (err, response) => {
  if (err) {
    console.error('Error connecting to Smart Meeting Rooms service:', err);
  } else {
    console.log('Connected to Smart Meeting Rooms service:', response.status);
  }
});
