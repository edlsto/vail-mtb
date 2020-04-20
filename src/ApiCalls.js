import { convertToFahrenheit } from "../src/helpers";

export const fetchTrails = () => {
  return fetch(
    `https://www.mtbproject.com/data/get-trails-by-id?ids=4362647,23955,37146,23291,7037830,7007026,3966441,7048696,36677,7018842,5880099,30865,7006083,14634,22699,7048752,7018691,7016128,7006601,3925129,7048504,7041206,5835116,6513770,13018,4363650,16054,22864,13489,37604,7030807,3880291,7017933,3268848,7048694,4355097,7018797,22643,2999485,4363242,7016131,4195455,5834763,7007355,7000163,5835079,7049065,7016729,7016928,2999552&key=200333709-${process.env.REACT_APP_MTBPROJECT_API_KEY}`
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
          conditionStatus,
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
            conditionStatus,
          };
        }
      );
    })
    .then((data) => data[0]);
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
