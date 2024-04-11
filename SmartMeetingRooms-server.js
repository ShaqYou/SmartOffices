//Importing the required parts
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefintion = protoLoader.loadSync('SmartMeetingRooms.proto', {});
const SmartMeetingRoomsProto = grpc.loadPackageDefinition.SmartMeetingRooms;

const grpc = require("@grpc/grpc-js");
const {
  SmartMeetingRoomsServiceService,
  BookRoomResponse,
  CancelBookingResponse,
} = require("./generated/smartmeetingrooms_grpc_pb");
const {
  BookRoomRequest,
  CancelBookingRequest,
} = require("./generated/smartmeetingrooms_pb");