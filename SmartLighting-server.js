const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefintion = protoLoader.loadSync('SmartLighting.proto', {});
const SmartLightingProto = grpc.loadPackageDefinition.SmartLighting;

const {
    SmartLightingServiceService,
    TurnOnOffLightsResponse,
    AdjustBrightnessResponse,
  } = require("./generated/smartlighting_grpc_pb");
  const {
    TurnOnOffLightsRequest,
    AdjustBrightnessRequest,
  } = require("./generated/smartlighting_pb");
  