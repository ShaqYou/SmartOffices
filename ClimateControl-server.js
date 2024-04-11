//Importing the required parts
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefintion = protoLoader.loadSync('ClimateControl.proto', {});
const ClimateControlProto = grpc.loadPackageDefinition.ClimateControl;

const {
    ClimateControlServiceService,
    AdjustTemperatureResponse,
    AdjustHumidityResponse,
  } = require("./generated/climatecontrol_grpc_pb");
  const {
    AdjustTemperatureRequest,
    AdjustHumidityRequest,
  } = require("./generated/climatecontrol_pb");