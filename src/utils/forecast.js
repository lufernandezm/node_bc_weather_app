const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=03e2f3ecd7dec06f9f67b6a1304a7daa&query=${latitude},${longitude}&units=m`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const weather_descriptions = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            callback(undefined,`${weather_descriptions}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`)
        }
    })
}

module.exports = forecast