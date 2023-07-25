serial.onDataReceived(serial.delimiters(Delimiters.SemiColon), function () {
    // basic.showString(serial.readUntil(serial.delimiters(Delimiters.SemiColon)))
    // basic.showString("X")
    command = serial.readUntil(serial.delimiters(Delimiters.SemiColon))
})
// @param {string} queryParam - The mnemonic for the sensor
function readWeatherSensor (queryParam: string) {
    switch(queryParam) {
        case 'temp':
            return weatherbit.temperature();break;
        case 'tempubit':
            return (input.temperature());break;
        case 'humid':
            return weatherbit.humidity();break;
        case 'press':
            return weatherbit.pressure();break;
        case 'alt':
            return weatherbit.altitude();break;
        case 'wspeed':
            return weatherbit.windSpeed();break;
        case 'wdir':
//             serial.writeValue("ADC P1", pins.analogReadPin(AnalogPin.P1));
//             return windDirection(); break;   
            return weatherbit.windDir(); break;   
        case 'rain':
            return weatherbit.rain(); break;
       case 'light':
            return input.lightLevel(); break;
        case 'compass':
            return input.compassHeading(); break;
        default:
            return 0;
    }
}

let command = ""
let voltage = 0
let item = ""
let slask = 0

//serial.redirect(SerialPin.P15, SerialPin.P14, BaudRate.BaudRate115200)
serial.redirect(SerialPin.P15, SerialPin.P14, BaudRate.BaudRate9600)
//
//serial.redirectToUSB()

let mnemonics = [
"temp",
"humid",
"press",
"wspeed",
"wdir",
"rain",
"light"
// "alt",
// "compass"
]

basic.forever(function () {
    weatherbit.startWeatherMonitoring()
    for (let currentParam of mnemonics) {
        serial.writeValue(currentParam, readWeatherSensor(currentParam))
        basic.pause(1000)
    }
    if (command != "") {
        serial.writeValue(command, readWeatherSensor(command))
        command = ""
    }
})
