var axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/forecast?appid=c4e735ea8bd7e7b6dc8368c752517b2d&units=metric';
// api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml


module.exports = {
  getTemp: function (location,location_code) {
    var location_code = encodeURIComponent(location_code);
    var encodedLocation = encodeURIComponent(location);
    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation},${location_code}`;

    return axios.get(requestUrl).then(function (res) {
      console.log(res);
      if (res.data.cod==200) {
          return res.data

      } else {
        console.log('error');
        
      }
    }, function (res) {
      throw new Error(res.data.message);
    });
  }
}
