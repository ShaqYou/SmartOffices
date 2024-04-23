// Import required parts
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the proto file
const packageDefinition = protoLoader.loadSync('Proto/SmartMeetingRoom.proto');
const smartOfficeProto = grpc.loadPackageDefinition(packageDefinition).smartoffice;

// Define gRPC server
const server = new grpc.Server();

// Implement methods
server.addService(smartOfficeProto.SmartMeetingRooms.service, {
  BookRoomWithUpdates: (call) => {
    call.on('data', (request) => {
      const { roomId, startTime, endTime, organizer } = request;
      console.log(`Received booking request for room ${roomId} from ${organizer} starting at ${startTime} until ${endTime}`);
      // Booking logic
      const bookingId = generateBookingId();
      call.write({ bookingId, status: 'Booking request received' });
    });
    call.on('end', () => {
      console.log('Booking process ended.');
      call.end();
    });
  },
});

function generateBookingId() {
  // Implementation to generate unique booking ID
  return `BOOKING_ID_${Math.floor(Math.random() * 1000)}`;
}
// Binding to port
server.bindAsync('127.0.0.1:50052', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err != null) {
    console.error(err);
    return;
  }
  server.start();
  console.log(`Smart Meeting Rooms Server running at http://127.0.0.1:${port}`);
});
