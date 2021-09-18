const request = require('request')
const geocode = (address, callback) => {
    const encodedAdress = encodeURIComponent(address)
    const locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAdress}.json?access_token=pk.eyJ1IjoibHVtYWQiLCJhIjoiY2t0Y3lkanAyMGNscTJ4cGZ2bmxuN2dxYiJ9.U9pNY27UBm4AbLRokboNmg`

    request({ url: locationUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode