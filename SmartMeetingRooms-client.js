// Import required parts
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('SmartMeetingRooms.proto');
const smartMeetingRoomProto = grpc.loadPackageDefinition(packageDefinition).smartoffice;

const client = new smartMeetingRoomProto.SmartMeetingRooms('localhost:50052', grpc.credentials.createInsecure());

// Bidirectional Streaming RPC - Book Room with Updates
const bookRoomWithUpdatesStream = client.BookRoomWithUpdates();
bookRoomWithUpdatesStream.on('data', (response) => {
  console.log('BookRoomWithUpdatesStream Response:', response.bookingId, response.status);
});
bookRoomWithUpdatesStream.on('end', () => {
  console.log('BookRoomWithUpdatesStream ended.');
});

// Sending multiple booking requests
bookRoomWithUpdatesStream.write({ roomId: '105', startTime: '2024-07-24', endTime: '2024-07-25', organizer: 'Shaqayeq Yousofi' });
bookRoomWithUpdatesStream.write({ roomId: '206', startTime: '2024-07-28', endTime: '2024-07-29', organizer: 'Marta Ahijadro' });
bookRoomWithUpdatesStream.end();