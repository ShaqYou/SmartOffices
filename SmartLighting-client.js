//Importing the required parts
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');

const packageDefinition = protoLoader.loadSync('SmartOffice.proto');
const smartOfficeProto = grpc.loadPackageDefinition(packageDefinition).smart_office;
const client = new smartOfficeProto.SmartOffice('localhost:50051', grpc.credentials.createInsecure());

//Creating an interface for user Input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {

    //If statement for user request on different functionalities
    const choice = await askQuestion('Do you want to control the lights or adjust the brightness? (lights/brightness): ');
    if (choice.toLowerCase() === 'lights') {
        const onChoice = await askQuestion('Do you want to turn the lights on or off? (on/off): ');
        const on = onChoice.toLowerCase() === 'on';
        client.turnOnOffLights({ on }, (error, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('TurnOnOffLights Response:', response.status);
                rl.close();
            }
        });
    } else if (choice.toLowerCase() === 'brightness') {
        const adjustBrightness = await askQuestion('Do you want to adjust the brightness? (yes/no): ');
        if (adjustBrightness.toLowerCase() === 'yes') {
            const brightnessLevel = await askQuestion('Enter brightness level (0-100): ');
            client.AdjustBrightness({ brightnessLevel: parseInt(brightnessLevel) }, (error, response) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('AdjustBrightness Response:', response.status);
                    rl.close();
                }
            });
        } else {
            console.log('No brightness adjustment requested.');
            rl.close();
        }
    } else {
        console.log('Invalid choice.');
        rl.close();
    }
}
main();
