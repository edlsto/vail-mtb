import { convertToFahrenheit } from "../src/helpers";

export const fetchTrails = () => {
  return fetch(
    `https://www.mtbproject.com/data/get-trails?lat=39.5764&lon=-106.7235&maxDistance=25&maxResults=70&key=200333709-${process.env.REACT_APP_MTBPROJECT_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.trails.map(
        ({
          id,
          name,
          difficulty,
          location,
          imgMedium,
          latitude,
          longitude,
          length,
          conditionStatus,
        }) => {
          return {
            id,
            name,
            difficulty,
            location,
            imgMedium,
            lat: latitude,
            lng: longitude,
            length,
            conditionStatus,
          };
        }
      );
    });
};

export const fetchTrail = (id) => {
  return fetch(
    `https://www.mtbproject.com/data/get-trails-by-id?ids=${id}&key=200333709-${process.env.REACT_APP_MTBPROJECT_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.trails.map(
        ({
          id,
          name,
          summary,
          difficulty,
          stars,
          location,
          url,
          imgMedium,
          length,
          ascent,
          descent,
          high,
          low,
          latitude,
          longitude,
          starVotes,
        }) => {
          return {
            id,
            name,
            summary,
            difficulty,
            stars,
            location,
            url,
            imgMedium,
            length,
            ascent,
            descent,
            high,
            low,
            lat: latitude,
            lng: longitude,
            starVotes,
          };
        }
      );
    });
};

export const fetchWeather = (lat, lng) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => data.daily)
    .then((data) =>
      data.map(({ dt, temp, weather }) => {
        return {
          dt,
          temp: { max: convertToFahrenheit(temp.max - 273) },
          weather,
        };
      })
    );
};

export const fetchTraffic = (lat, lng, time = "") => {
  return fetch(
    `http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=39.712264,-105.193971&wayPoint.2=${lat},${lng}&heading=270&distanceUnit=mi&dateTime=${time}&key=${process.env.REACT_APP_BINGMAPS_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => data.resourceSets[0].resources[0].travelDurationTraffic);
};
