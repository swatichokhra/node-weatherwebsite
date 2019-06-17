//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request');
const forecast = (lat,long,callback) => {

        const url = 'https://api.darksky.net/forecast/af892970f49166a3d9a7e852425a0899/' + lat + ',' + long;
    request({ url, json : true}, (error,response) => {
        if (error)
        {
            callback('Unable to connect to weather services',undefined);
        }
        else if (response.body.error ){
            callback('Unable to find coordinate.try another search',undefined);
        }
        else {
            callback(undefined, 'It is currently ' + response.body.currently.temperature + ' degrees out.High today is :' + response.body.daily.data[0].temperatureHigh + 'Low today is: ' + response.body.daily.data[0].temperatureLow + ' There is a ' + response.body.currently.precipProbability + '% chance of rain.');
        }

    })
}

module.exports = forecast;