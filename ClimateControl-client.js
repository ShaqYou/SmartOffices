// Import necessary parts
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');

//Creating Client
const packageDefinition = protoLoader.loadSync('SmartOffice.proto');
const SmartOfficeProto = grpc.loadPackageDefinition(packageDefinition).SmartOffice;
const client = new climateControlProto('localhost:50051', grpc.credentials.createInsecure());

//Creating an interface for user Input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
  }


// Main function to interact with the Climate Control server
async function main() {
    // Adjust temperature
    const targetTemperature = await askQuestion('Enter target temperature: ');
    client.AdjustTemperature({ targetTemperature: parseFloat(targetTemperature) }, (error, response) => {
        if (error) {
            console.error(error);
        } else {
            console.log('AdjustTemperature Response:', response.status);
            // After adjusting temperature, call adjustHumidity
            adjustHumidity();
        }
    });
}

// Adjust humidity
async function adjustHumidity() {
    const humidityLevel = await askQuestion('Enter airflow level: ');
    client.AdjustHumidity({ humidityLevel: parseInt(humidityLevel) }, (error, response) => {
        if (error) {
            console.error(error);
        } else {
            console.log('AdjustHumidity Response:', response.status);
            // Close the readline interface after all interactions are complete
            rl.close();
        }
    });
}
   main();
                                                                      