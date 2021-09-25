const request = require('request')

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoibWFuYW4xMjA1IiwiYSI6ImNrdDJneW9jZTBlZW4zMHIxOHNzaTdnem0ifQ.-kZtZiirkxaZ4ysVFMwaBw&limit=1`
    
    request({ url, json:true }, (error, { body }) => {
        if(error) {
            callback("Cannot connect to location API", undefined)
        } else if(body.features.length === 0) {
            callback("No such location found", undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            })
        }

    })
}

module.exports = geocode