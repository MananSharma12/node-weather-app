const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=dd24c8900195e4fedf59e989c2e347ad&lat=${lat}&lon=${lon}&units=metric`
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback("Unable to connect to Weather Services", undefined)
        } else if (body.cod == "404") {
            callback(body.message, undefined)
        } else {
            callback(undefined, `It is currently ${body.main.temp} degrees out and ${body.weather[0].main}.`);
        }
    })  
}

module.exports = forecast
