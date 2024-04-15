// Import required parts
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the proto file
const packageDefinition = protoLoader.loadSync('SmartOffice.proto');
const smartOfficeProto = grpc.loadPackageDefinition(packageDefinition).smart_office;

// Define gRPC server
const server = new grpc.Server();

// Implement methods
server.addService(smartOfficeProto.SmartMeetingRooms.service, {
  BookRoom: (call, callback) => {
    const roomId = call.request.room_id;
    const meetingTime = call.request.meeting_time;
    const meetingDuration = call.request.meeting_duration;
    console.log(`Booking room ${roomId} for meeting at ${meetingTime} for duration ${meetingDuration}`);
    // Writing implementation later
    const bookingId = generateBookingId(); 
    callback(null, { success: true, booking_id: bookingId }); 
  },
  CancelBooking: (call, callback) => {
    const bookingId = call.request.booking_id;
    console.log(`Canceling booking with ID ${bookingId}`);
    // Writing implementation later
    callback(null, { success: true }); // Respond with success
  },
});
